$(document).ready(function() {

//Click event to update hero banner to the appropriate image/text of category clicked
function changeHero() {
    $("#mind").click(function() {
        $("#categories-image-banner").attr("src", "/images/mind-body.jpg");
        $("#categories-image-banner2").attr("src", "/images/mind-body2.jpg");
        $("#categories-hero-text").text("Mind & Body");
    });
}
changeHero();
console.log(changeHero)

});