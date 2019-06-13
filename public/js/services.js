// ref to input fields in html
var $userSubmitBtn = $("#submit-user");

var $volFirstName = $("#vol-name");
var $volList = $("#volunteer-list");

var $userList = $("#users-list");
var $userFirst = $("#user-first-name");
var $userLast = $("#user-last-name");
var $userRole = $("#hidden-div-role");
// var $userActivity = $("activity");

// Get users
// getUsers();

var $gender;
// var $userActivity = $("activity");
// $("input[type='radio']").click(function(){
//     var radioValue = $("input[name='gender']:checked")[0].id;
//     console.log(radioValue);
//     $gender = radioValue;
//     console.log($gender);
    
// });

// The API object contains methods for each kind of request we'll make
var API = {
    saveUser: function (user) {
        console.log(user);
        return $.ajax({
            // headers: {
            //     "Content-Type": "applications/json"
            // },
            type: "POST",
            url: "api/users",
            data: user
        });
    },
    getUsers: function () {
        return $.ajax({
            url: "api/users",
            type: "GET"
        });
    },
    deleteUsers: function (id) {
        return $.ajax({
            url: "api/users/" + id,
            type: "DELETE"
        });
    },
    saveVolunteer: function (volunteer) {
        return $.ajax({
            // headers: {
            //     "Content-Type": "application/json"
            // },
            type: "POST",
            url: "api/volunteers",
            data: volunteer
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

// User functions ======================================================

// refresh to get new users from the db and repopulate
var refreshUsers = function () {
    API.getUsers().then(function (data) {
        var $users = data.map(function (user) {
            var $a = $("<a>")
                .text(user.first_name + " " + user.last_name 
                + " ")
                .attr("href", "/user/" + user.id);

            var $li = $("<li>")
                .attr({
                    class: "list-user-item",
                    "data-user-id": user.id
                })
                .append($a);

            var $button = $("<button>")
                .addClass("btn btn-danger float-right delete-user")
                .text("ｘ");

            $li.append($button);

            return $li;
        });

        // append to html
        $userList.empty();
        $userList.append($users);
    });
};

var handleUserSubmit = function (event) {
    //console.log("handleUserSubmit function");
    event.preventDefault();

    var user = {
        first_name: $userFirst.val().trim(),
        last_name: $userLast.val().trim(),
        // gender: $gender.val
        // role: $userRole.val().trim()
    };
    //console.log(user.first_name + " var user inside handleUserSubmit func");
    //console.log(user.last_name + " var user inside handleUserSubmit func");
    // console.log(user.role + " var user inside handleUserSubmit func");
    //console.log(user + " var user inside handleUserSubmit func");

    if (!(user.last_name && user.last_name)) {
        alert("Please enter your first and last name.");
        return;
    }

    API.saveUser(user).then(function () {
        //console.log(user + "API.saveUser call");
        refreshUsers();
    });

    $userFirst.val("");
    $userLast.val("");
    // $userRole.val("");

    $("#hidden-div-role").val("");
    //console.log($userFirst + "after val clear");
};

var handleUserDelete = function () {
    var idToDelete = $(this).parent().attr("data-user-id");

    API.deleteUsers(idToDelete)
        .then(function () {
            refreshUsers();
        });
};

// Volunteer functions ==========================================================

// refreshVolunteers gets new volunteers from the db and repopulates the list
var refreshVolunteers = function () {
    API.getVolunteers().then(function (data) {
        var $volunteers = data.map(function (volunteer) {
            var $a = $("<a>")
                .text(volunteer.vol_name)
                .attr("href", "/volunteer/" + volunteer.id);

            var $li = $("<li>")
                .attr({
                    class: "list-user-item",
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
        vol_name: $volFirstName.val().trim()
    }
    //console.log(volunteer);

    if (!(volunteer.vol_name)) {
        alert("You must enter your name!");
        return;

        //console.log("add first name");
    }

    API.saveVolunteer(volunteer)
        .then(function () {
            refreshVolunteers();
        });

    $volFirstName.val("");
};

// handle what happens when delete button pressed
function handleDeleteButton() {
    var idToDelete = $(this).parent().attr("data");

    API.deleteVolunteers(idToDelete)
        .then(function () {
            refreshVolunteers();
        });
};

// Adding on click events for volunteer-chosen and request-services-chosen radios to then...
// display the appropriate radio/checkmark booleans (volunteers can have multiple interests...
// and requesters can have only one request);

$("#volunteer-chosen").on("click", function (e) {
    //console.log("volunteer clicked");

    $("#hidden-div-role").text("volunteer");
    // console.log($userRole);

    var interestsArray = ["Transportation", "Pet Care", "Babysitting", "Groceries", "Errands", "Yardwork", "Housekeeping", "Home Projects", "Movers"];
    var $interestOptions = $("#append-radios-checkmarks");
    // var appendH6 = $(".append-h6");

    $interestOptions.empty();
    // appendH6.empty();
    // e.preventDefault();

    // appendH6.html("<h6>In which areas are you best suited to volunteer?</h6>");
    // $("#append-radios-checkmarks").append(appendH6);

    for (var i = 0; i < interestsArray.length; i++) {
        //console.log(interestsArray[i]);

        var interestPara = $("<p>");
        var interestLabel = $("<label>");
        var interestInput = $("<input />");
        var interestSpan = $("<span>");
        // var interestSpan = $("<span>");
        // //console.log(interestInput[0]);

        interestPara.addClass("append-label");
        interestPara.attr("data-para", interestsArray[i]);

        interestLabel.addClass("append-input");

        interestInput.addClass("filled-in append");
        interestInput.attr("type", "checkbox");
        interestInput.attr("name", "activity");
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
    //console.log("request clicked");

    $("#hidden-div-role").text("requester");
    // console.log($userRole);

    var interestsArray = ["Transportation", "Pet Care", "Babysitting", "Groceries", "Errands", "Yardwork", "Housekeeping", "Home Projects", "Movers"];
    var $interestOptions = $("#append-radios-checkmarks");

    $interestOptions.empty();
    // e.preventDefault();

    for (var i = 0; i < interestsArray.length; i++) {
        var interestPara = $("<p>");
        var interestLabel = $("<label>");
        var interestInput = $("<input />");
        var interestSpan = $("<span>");
        // var interestSpan = $("<span>");
        // //console.log(interestInput[0]);

        interestPara.addClass("append-label");
        interestPara.attr("data-para", interestsArray[i]);

        interestLabel.addClass("append-input");

        interestInput.addClass("filled-in append");
        interestInput.attr("type", "checkbox");
        interestInput.attr("name", "activity");
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

// event listeners
$userSubmitBtn.on("click", handleUserSubmit);
// $userList.on("click", ".delete-user", handleDeleteButton);