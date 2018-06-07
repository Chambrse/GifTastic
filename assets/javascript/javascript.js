$(document).ready(function () {

    var initialButtons = ["labrador", "greyhound", "bloodhound", "pug", "golden retriever", "wolfhound", "doberman", "chihuahua", "terrier", "dachsund", "great dane"];
    var newButton;

    function renderButtons() {

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
        var offset = Math.floor(Math.random()*1000);

        var searchURL = "http://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=Ba3PLHdmCP7VSmg0DSa9iAQmJ7fcRRuW&limit=25&offset=" + offset;

        $.ajax({
            url: searchURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (var j = 0; j < response.data.length; j++) {

                var imageDiv = $("<img>");
                imageDiv.attr("src", response.data[j].images.fixed_height_still.url);
                imageDiv.attr("alt", response.data[j].slug);
                imageDiv.addClass("gifItem");
                $("#gifs").append(imageDiv);

            }

        });


    };

    $(document).on("click", ".searchButton", gifSearch)

});