const cardTarget = "#cardContainer";
const searchButton = "#submit";
const searchTypeElement = "#searchType";
const searchInputElement = "#userInput";
const gameTarget = "#targetCol";
const scoreTarget="#scoreCol"

var startingCharacterID = "";
var targetCharacterID = "";
var targetCharacterName="";
var targetGenerated = false;
var gameStarted = false;
var numSteps=0;

$("#startGame").click(function () {
    $(this).hide();
    beginGame();
});
function initializeGame() {
    var rand = Math.floor(Math.random() * 493);
    targetCharacter = rand;
    rand = Math.floor(Math.random() * 493);
    startingCharacter = rand;

    while (targetCharacter == startingCharacter) {
        rand = Math.floor(Math.random() * 493);
        startingCharacter = rand;
    }

    console.log("starting at: " + startingCharacter);
    console.log("Searching for: " + targetCharacter);

}//game init

function beginGame() {
    displayCharacters(startingCharacter,false);
    displayCharacters(targetCharacter,true);
    gameStarted=true;
}//beginGame

function gameEnded(response){
    console.log("end screen");
    $(cardTarget).empty();
    appendCard(createCharacterElement(response));
}

// displayCharacters([startingCharacter,targetCharacter]);

$(document).ready(function () {
    $('select').formSelect();
});
var randomNum = Math.floor(Math.random() * Math.floor(31))
var test = [randomNum];
$("#char").click(function () { displayCharacters(test,false) });
$("#ep").click(function () { displayEpisodes(test,false) });
$("#loc").click(function () { displayLocations(test,false) });

$(cardTarget).on("click", ".peopleLink", function () {
    var link = JSON.parse($(this).attr("data-people"));
    console.log("displaying people: " + link);
    numSteps++;
    if(gameStarted==true){
        $(scoreTarget).empty().append("<h4>Steps: "+numSteps+"</h4>");
    }
   
    displayCharacters(link,false);

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


function appendCard(card) {
    $(cardTarget).append(card);
}//appendCard

function appendTarget(card) {
    $(gameTarget).empty();
    $(gameTarget).append(card);
}