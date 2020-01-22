const cardTarget="#cardContainer";
const searchButton = "#submit";
const searchTypeElement="#searchType";
const searchInputElement="#userInput";

$(document).ready(function () {
    $('select').formSelect();
});
var randomNum = Math.floor(Math.random() * Math.floor(31))
var test = [randomNum];
$("#char").click(function () { displayCharacters(test) });
$("#ep").click(function () { displayEpisodes(test) });
$("#loc").click(function () { displayLocations(test) });

$(cardTarget).on("click", ".peopleLink", function () {
    var link = JSON.parse($(this).attr("data-people"));
    console.log("displaying people: " + link);

    displayCharacters(link);

});

$(cardTarget).on("click", ".episodeLink", function () {
    var link = JSON.parse($(this).attr("data-episode"));
    console.log("displaying episodes: " + link)

    displayEpisodes(link);

});

$(cardTarget).on("click", ".locationLink", function () {
    var link = JSON.parse($(this).attr("data-location"));
    console.log("displaying locations: " + link);

    displayLocations(link);

});

$(searchButton).click(function () {
    var searchType = $(searchTypeElement).val();
    var searchInput = $(searchInputElement).val();
    console.log(searchType);
    console.log("button pressed");
    if (searchType != null && searchInput != "") {
        console.log("deciding search parameters");
        switch (searchType) {
            case "1":
                console.log("searching for character: " + searchInput);
                characterSearch(searchInput);
                break;
            case "2":
                console.log("searching for episode: " + searchInput);

                episodeSearch(searchInput);
                break;
            case "3":
                console.log("searching for location: " + searchInput);

                locationSearch(searchInput);
                break;
            default:
                console.log("search failed");
                break;
        }



    }//if given input

});


function appendCard(card){
    $(cardTarget).append(card);
}//appendCard