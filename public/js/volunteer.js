$(document).ready(function() {
    // ref to input fields in html
    var firstNameInput = $("#first_name");

    // event listeners
    $("#submit-volunteer").on("click", volunteerFormSubmit);

    listVolunteers();

    // func to handle volunteer form submission
    function volunteerFormSubmit(event) {
        event.preventDefault();

        if (!firstNameInput.val().trim().trim()) {
            return;
        }

        createVolunteer ({
            first_name: firstNameInput.val().trim()
        });
    };

    // func to create volunteer
    function createVolunteer(volData) {
        $.post("/volunteers", volData)
        .then(listVolunteers); // <============= do we need to make a volunteers.hb page??
    };

    // create new row in html for the added volunteer
    function createVolRow(volData) {
        var newRow = $("<tr>");
        newRow.data("volunteer", volData);
        newRow.append("<td>" + volData.first_name + "</td>");

        if (volData)
    };

    // func to render list of volunteers
    function renderVolList(rows) {
        //.
    };

    // handle empty render
    function renderNoVols() {
        //.
    };

    // handle what happens when delete button pressed
    function handleDeleteButton() {
        //.
    };

});