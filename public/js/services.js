$(document).ready(function () {
    // ref to input fields in html
    var $firstNameInput = $("#vol_name");
    var $volList = $("#volunteer-list");
    // var volModalContent = ("#modal2");

    // The API object contains methods for each kind of request we'll make
    var API = {
        saveVolunteer: function (volunteer) {
            return $.ajax({
                headers: {
                    "Content-Type": "application/json"
                },
                type: "POST",
                url: "api/volunteers",
                data: JSON.stringify(volunteer)
            });
        },
        getVolunteers: function () {
            return $.ajax({
                url: "api/volunteers",
                type: "GET"
            });
        },
        deleteVolunteers: function (id) {
            return $.ajax({
                url: "api/volunteers/" + id,
                type: "DELETE"
            });
        }
    };

    // refreshVolunteers gets new volunteers from the db and repopulates the list
    var refreshVolunteers = function () {
        API.getVolunteers().then(function (data) {
            var $volunteers = data.map(function (volunteer) {
                var $a = $("<a>")
                    .text(volunteer.vol_name)
                    .attr("href", "/volunteer/" + volunteer.id);

                var $li = $("<li>")
                    .attr({
                        class: "list-group-item",
                        "data-id": volunteer.id
                    })
                    .append($a);

                var $button = $("<button>")
                    .addClass("btn btn-danger float-right delete")
                    .text("ｘ");

                $li.append($button);

                return $li;
            });

            $volList.empty();
            $volList.append($volunteers);
        });
    };

    // func to handle volunteer form submission
    function volunteerFormSubmit(event) {
        event.preventDefault();

        var volunteer = {
            vol_name: $firstNameInput.val().trim()
        }
        console.log(volunteer);

        if (!(volunteer.vol_name)) {
            alert("You must enter your name!");
            return;

            console.log("add first name");
        }

        API.saveVolunteer(volunteer)
            .then(function () {
                refreshVolunteers();
            });

        $firstNameInput.val("");
    };

    // handle what happens when delete button pressed
    function handleDeleteButton() {
        var idToDelete = $(this).parent().attr("data-id");

        API.deleteVolunteers(idToDelete)
            .then(function () {
                refreshVolunteers();
            });
    };

    // event listeners
    $("#submit_volunteer").on("click", volunteerFormSubmit);
    $("#delete_user").on("click", handleDeleteButton);

});