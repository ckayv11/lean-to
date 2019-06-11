$(document).ready(function () {
    // ref to input fields in html
    var $firstNameInput = $("#vol-name");
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

    // Adding on click events for volunteer-chosen and request-services-chosen radios to then...
    // display the appropriate radio/checkmark booleans (volunteers can have multiple interests...
    // and requesters can have only one request);

    $("#volunteer-chosen").on("click", function (e) {
        console.log("volunteer clicked");

        var interestsArray = ["Transportation", "Pet Care", "Babysitting", "Groceries", "Errands", "Yardwork", "Housekeeping", "Home Projects", "Movers"];
        var $interestOptions = $("#append-radios-checkmarks");
        // var appendH6 = $(".append-h6");

        $interestOptions.empty();
        // appendH6.empty();
        e.preventDefault();

        // appendH6.html("<h6>In which areas are you best suited to volunteer?</h6>");
        // $("#append-radios-checkmarks").append(appendH6);

        for (var i = 0; i < interestsArray.length; i++) {
            console.log(interestsArray[i]);

            var interestPara = $("<p>");
            var interestLabel = $("<label>");
            var interestInput = $("<input />");
            var interestSpan = $("<span>");
            // var interestSpan = $("<span>");
            // console.log(interestInput[0]);

            interestPara.addClass("append-label");
            interestPara.attr("data-para", interestsArray[i]);

            interestLabel.addClass("append-input");

            interestInput.addClass("filled-in append");
            interestInput.attr("type", "checkbox");
            interestInput.attr("data-input", interestsArray[i]);

            interestSpan.addClass("user-needs");
            interestSpan.attr("data-span", interestsArray[i]);
            interestSpan.text(interestsArray[i]);
            // interestSpan.text(interests[i]);

            interestLabel.append(interestInput);
            interestLabel.append(interestSpan);
            interestPara.append(interestLabel);
            $("#append-radios-checkmarks").append(interestPara);
            // $("#append-radios-checkmarks").append(interestSpan);

        }

    });

    $("#request-services-chosen").on("click", function (e) {
        console.log("request clicked");

        var interestsArray = ["Transportation", "Pet Care", "Babysitting", "Groceries", "Errands", "Yardwork", "Housekeeping", "Home Projects", "Movers"];
        var $interestOptions = $("#append-radios-checkmarks");

        $interestOptions.empty();
        e.preventDefault();

        for (var i = 0; i < interestsArray.length; i++) {
            var interestPara = $("<p>");
            var interestLabel = $("<label>");
            var interestInput = $("<input />");
            var interestSpan = $("<span>");
            // var interestSpan = $("<span>");
            // console.log(interestInput[0]);

            interestPara.addClass("append-label");
            interestPara.attr("data-para", interestsArray[i]);

            interestLabel.addClass("append-input");

            interestInput.addClass("filled-in append");
            interestInput.attr("type", "checkbox");
            // interestInput.attr("name", "requester-radio");
            interestInput.attr("data-input", interestsArray[i]);

            interestSpan.addClass("user-needs");
            interestSpan.attr("data-span", interestsArray[i]);
            interestSpan.text(interestsArray[i]);
            // interestSpan.text(interests[i]);

            interestLabel.append(interestInput);
            interestLabel.append(interestSpan);
            interestPara.append(interestLabel);
            $("#append-radios-checkmarks").append(interestPara);

        }
    });

});