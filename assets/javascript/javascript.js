$(document).ready(function() {

    var initialButtons = ["labrador", "greyhound", "bloodhound", "pug", "golden retriever", "wolfhound", "doberman", "chihuahua", "terrier", "dachsund", "great dane"];
    var newButton;

    function renderButtons () {

        $("#buttons").empty();

        for (var i = 0; i < initialButtons.length; i++) {
            newButton = $("<button>");
            newButton.addClass("searchButton btn btn-secondary");
            newButton.attr("type", "submit");
            newButton.text(initialButtons[i]);
            $("#buttons").append(newButton);
        };

    };
    
    renderButtons();

    function gifSearch() {

        var term = $(this).text();

        var searchURL = "http://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=Ba3PLHdmCP7VSmg0DSa9iAQmJ7fcRRuW&limit=5";

        $.ajax({
            url: searchURL,
            method: "GET"
        }).then(function(response) {
            var imageDiv = $("<img>");
            imageDiv.attr("src", response.data[0].images.fixed_height_still.url);
            imageDiv.attr("alt", response.data[0].slug);
            imageDiv.addClass("gifItem");
            $("#gifs").append(imageDiv);

        });
    };

    $(document).on("click", ".searchButton", gifSearch)

});