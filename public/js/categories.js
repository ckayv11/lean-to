$(document).ready(function(){

// Use moment to capture current date
var currentDate = moment().format('YYYY-MM-DD');

// Click Events to get actual category that was clicked 
$(document).on("click", ".click-category", function () {
    const data = $(this).attr("data-category");
    localStorage.setItem("category", data);
    window.location.href = "/categories"; // or is it ="categories.handlebars" ?
    });

// Function to access data from API
function getArticles() {
    var category = localStorage.getItem("category")
    var queryURL = 'https://newsapi.org/v2/everything?' +
        'q=' + category +
        '&from' + currentDate +
        '&language=english&' +
        'sortBy=popularity&' +
        'apiKey=7901a57d723f41f19a8842e99327ab2e';
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(displayArticles);
    console.log(displayArticles);
};
getArticles();

// Function to store data
.then(function(articleData) {
var results = everything.articles;
console.log(results);

var articles = [];

for (var i = 0; i < results.length; i++) {
    var articleObject = {};
    articleObject.title = results[i].title;
    articleObject.author = results[i].author;
    articleObject.description = results[i].description;
    articleObject.url = results[i].url;
    articleObject.urlToImage = results[i].urlToImage;
    articleObject.publishedAt = results[i].publishedAt;
    articleObject.content = results[i].content;

    articles.push(articleObject);

};
});

// Function takes in data from API and appends the data to the card
function displayArticles(articles) {

    articles.forEach(function(articleObject) {

        var mainCard = $("<div>");
        mainCard.addClass("col s12 m6 l4");
        var articleURL = articleObject.url;
        var articleLink = $("<a>", {href: articleURL}, {target: "blank"});
        mainCard.append(articleLink);

        var card = $("<div>");
        card.addClass("card article-card");
        mainCard.append(card);

        var cardImage = $("<div>");
        cardImage.addClass("card-image waves-effect waves-block waves-light");
        var imgURL = articleObject.urlToImage;
        var image = $("<img>").attr("src", imgURL);
        cardImage.append(image);
        card.append(cardImage);

        var cardContent = $("<div>");
        cardContent.addClass("card-content center-align");
        var publishDate = articleObject.publishedAt;
        var date = $("<p>").text(moment(publishDate).format("LL"));
        cardContent.append(date);

        var articleTitle = articleObject.title;
        var title = $("<span>").text(articleTitle);
        title.addClass("card-title");
        cardContent.append(title);

        var authorName = articleObject.author;
        var name = $("<p>").text(authorName);
        cardContent.append(name);
        card.append(cardContent);
        mainCard.append(card);

        $(".results-body").append(mainCard);

    });

};

});