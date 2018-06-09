$(document).ready(function () {

    /* the values of the buttons that show up automatically on page load */
    var initialButtons = ["labrador", "greyhound", "bloodhound", "pug", "golden retriever", "wolfhound", "doberman", "chihuahua", "terrier", "dachsund", "great dane"];

    var newButton;
    var searchURL;

    renderButtons();

    /* Generating the buttons */
    function renderButtons() {

        /* So we don't have duplicate buttons. */
        $("#buttons").empty();

        var newButton;

        for (var i = 0; i < initialButtons.length; i++) {
            newButton = $("<button>");
            newButton.addClass("searchButton btn btn-secondary");
            newButton.attr("type", "submit");
            newButton.text(initialButtons[i]);
            $("#buttons").append(newButton);
        };

    };

    /* GET from giphy API */
    function gifSearch() {

        /* What the query will be. */
        var term = $(this).text();

        /* Construct the URL. */
        searchURL = "http://api.giphy.com/v1/gifs/random?tag=" + term + "&api_key=Ba3PLHdmCP7VSmg0DSa9iAQmJ7fcRRuW";


        /* I specifically loop outside the AJAX call and use the random endpont in stead of search because it seems like they're sorted by relevance; you could get a bunch of pictures that made no sense. This way at least it only shows one of the badly matched photos before moving on. It is slower, though, obviously.*/
        for (var j = 0; j < 25; j++) {

            /* AJAX! */
            $.ajax({
                url: searchURL,
                method: "GET"
            }).then(function (response) {

                console.log(response);

                /* wrapping the image div so that a loading animation div can be .after-ed */
                var imageWrapperDiv = $("<div class='imageWrapper position-relative'>");

                var imageDiv = $("<img>");
                imageDiv.attr("src", response.data.images.fixed_height_still.url);
                imageDiv.attr("alt", response.data.slug);
                imageDiv.attr("gifId", response.data.id);
                imageDiv.attr("stillURL", response.data.images.fixed_height_still.url)
                imageDiv.attr("gifURL", response.data.images.fixed_height.url);
                imageDiv.attr("state", "still");
                imageDiv.addClass("gifItem");

                imageWrapperDiv.append(imageDiv);

                $("#gifs").prepend(imageWrapperDiv);


            });
        };


    };


    function startGif(mainImage) {

        console.log(mainImage);
        /* This makes the .imageWrapper:hover darken not work */
        mainImage.parent().addClass("no-hover");

        /* Adds another image tag with the loading gif as as sibling inside the imageWrapper.
        AKA: start the loading animation. */
        mainImage.after('<img src="assets/images/loading.gif" class="load"/>')

            /* Changes the source to the animated gif. */
            .attr('src', mainImage.attr("gifURL"))

            /* Once the gif is loaded and starts playing, remove the loading animation, and make it hover-able again */
            .one('load', function () {
                mainImage.next().remove();
            })

            .attr("state", "animate");

    };

    function endGif(mainImage) {
        mainImage.attr('src', mainImage.attr("stillURL"))
            .attr("state", "still")
            .parent().removeClass("no-hover");

    }

    function addButton(inputString) {
        initialButtons.push(InputString);
        renderButtons();
    };

    $(document).on("click", ".gifItem", function() {
        
        var mainImage = $(this);

        if ($(this).attr("state") === "still") {
            startGif(mainImage);
        } else {
            endGif(mainImage);
        }

    });

    $("#submitButton").on("click", function() {

        var inputString = $("#inputString").val();

        console.log(inputString);

        addButton(inputString);

    });

});