$(document).ready(function () {
    // ref to input fields in html
    var firstNameInput = $("#first_name");
    var volList = $("#volunteer");
    // var volModalContent = ("#modal2");

    // event listeners
    // $(document).on("submit_volunteer", "#volunteer", volunteerFormSubmit);
    $("#submit_volunteer").on("click", volunteerFormSubmit);
    $("#delete_user").on("click", handleDeleteButton);

    listVolunteers();

    // func to handle volunteer form submission
    function volunteerFormSubmit(event) {
        event.preventDefault();

        if (!firstNameInput.val().trim()) {
            // return;
            console.log("add first name");
        }

        createVolunteer({
            first_name: firstNameInput.val().trim()
        });
    };

    // func to create volunteer
    function createVolunteer(volData) {
        $.post("/admin", volData)
            .then(listVolunteers);
    };

    // create new row in html for the added volunteer
    function createVolRow(volData) {
        var newRow = $("<tr>");
        newRow.data("volunteer", volData);
        newRow.append("<td>" + volData.first_name + "</td>");

        if (volData.Users) {
            newRow.append("<td>" + volData.Users.length + "</td");
        }
        else {
            newRow.append("<td>0</td>");
        }
        newRow.append("<td><a href='/admin?user_id=" + volData.id + "'>Go to volunteers Page</a></td>");
        newRow.append("<td><a style='cursor:pointer;color:red' class='delete_user'>Delete User</a></td>");
        return newRow;
    };

    // Function for retrieving volunteers and getting them ready to be rendered to the page
    function listVolunteers() {
        $.get("/api/admin", function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createVolRow(data[i]));
            }
            renderVolList(rowsToAdd);
            firstNameInput.val("");
        });
    }

    // func to render list of volunteers to the page
    function renderVolList(rows) {
        volList.children().not(":last").remove();
        // volModalContent.children(".alert").remove();
        
        if (rows.length) {
            // console.log(rows);
            volList.prepend(rows);
        }
        else {
            renderNoVols();
        }
    };

    // handle empty render
    function renderNoVols() {
        var alertDiv = $("<div>");

        alertDiv.addClass("alert");
        alertDiv.text("You must create a User account.");
        // volModalContent.append(alertDiv);
    };

    // handle what happens when delete button pressed
    function handleDeleteButton() {
        var listItemData = $(this).parent("td").parent("tr").data("user");
        var id = listItemData.id;

        $.ajax({
            method: "DELETE",
            url: "/api/users/" + id
        })
            .then(listVolunteers);
    };

});