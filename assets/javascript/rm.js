const baseURL = "https://rickandmortyapi.com/api/";
const characterURL = baseURL + "character/";
const locationURL = baseURL + "location/";
const episodeURL = baseURL + "episode/";

var num = 0;

// displayCharacters([12,13,14,15,16],false);


function displayCharacters(people,game) {
    $.ajax({
        url: characterURL + people,
        method: "GET"
    }).done(function (response) {
       
        num = 0;
        //console.log(response);

        if (people.length === 1 || !Array.isArray(people)) {
            console.log("one character")

            if(game == true){
                appendTarget(createCharacterElement(response))
                targetCharacterName=response.name;
                console.log("Searching for: "+targetCharacterName);
            }

            else{
                $(cardTarget).empty();
                var card=createCharacterElement(response);
                if(card!=null){
                    appendCard(card);
                }

            }

        }        //if one character
        else {
            $(cardTarget).empty();
            console.log(people.length + " characters");
            for (var i = 0; i < people.length; i++) {
                var card = createCharacterElement(response[i]);
                if(card==null){
                    return;
                }
                else{

                    appendCard(card);
                }
            }//for
        }

    });
}//display characters

function displayEpisodes(episodes) {
    $.ajax({
        url: episodeURL + episodes,
        method: "GET"
    }).done(function (response) {
        $(cardTarget).empty();
        num = 0;
        console.log(episodes);
        console.log(episodes.length);
        console.log(response);

        if (episodes.length === 1 || !Array.isArray(episodes)) {
            console.log("one episode")
            appendCard(createEpisodeElement(response));
        }//if 1

        else {

            for (var i = 0; i < episodes.length; i++) {
            appendCard(createEpisodeElement(response[i]));
            }
        }



    });

}//display episodes

function displayLocations(locations) {
    $.ajax({
        url: locationURL + locations,
        method: "GET"
    }).done(function (response) {
        $(cardTarget).empty();
        num = 0;

        if (locations.length === 1 || !Array.isArray(locations)) {
            console.log("one location");
            appendCard(createLocationElement(response));
        }
        else {
            console.log(locations.length)
            for (var i = 0; i < locations.length; i++) {
                appendCard(createLocationElement(response[i]));
            }
        }

    });
}


function createCharacterElement(response) {
    //console.log("Character");
    console.log(response);
    if (response != null) {

        num++;
        console.log(num);
        var charData = parseCharacterData(response);
        //console.log(charData);
        let eps = charData[2];
        for (let i = 0; i < eps.length; i++) {
            eps[i] = getLinkId(eps[i]);
        }//for
        var colDiv = $("<div>");
        colDiv.addClass("col");
        var charDiv = $("<div>");
        charDiv.addClass("card");
        var cardImage = $("<div>");
        cardImage.addClass("card-image");
        var charPic = $("<img>");
        charPic.attr("src", charData[3]);
        charPic.attr("alt", charData[0] + " picture");
        cardImage.append(charPic);
        var charName = $("<span>");
        charName.addClass("card-title");
        charName.text(charData[0]);
        cardImage.append(charName);
        charDiv.append(cardImage);
        var cardContent = $("<div>");
        cardContent.addClass("card-content");
        var charLoc = $("<p>");
        charLoc.text("Location: " + charData[1].name);
        charLoc.attr("data-location", getLinkId(charData[1].url));
        charLoc.addClass("locationLink");
        cardContent.append(charLoc);
        var episodes = $("<p>");
        episodes.text("Click to view the " + eps.length + " episode(s) this character is in");
        episodes.attr("data-episode", JSON.stringify(eps));
        episodes.addClass("episodeLink");
        cardContent.append(episodes);
        charDiv.append(cardContent);
        colDiv.append(charDiv);
        console.log("Created: " +response.id+" "+ charData[0]);
        if(charData[0]==targetCharacterName && gameStarted==true){
            console.log("success");
            gameStarted=false;
            gameEnded(response);
            return null;
        }

        return colDiv;


    }//if not null
}//create character


function createLocationElement(response) {
    if (response != null) {

        num++;
        console.log(num);
        var locData = parseLocationData(response);
        var people = locData[2];

        for (let i = 0; i < people.length; i++) {
            people[i] = getLinkId(people[i]);
        }//for each person

        var colDiv = $("<div>");
        colDiv.addClass("col");
        var locDiv = $("<div>");
        locDiv.addClass("card");
        var cardImage = $("<div>");
        cardImage.addClass("card-image");
        var locPic = $("<img>");
        locPic.attr("src", "https://i.guim.co.uk/img/media/b563ac5db4b4a4e1197c586bbca3edebca9173cd/0_12_3307_1985/master/3307.jpg?width=300&quality=85&auto=format&fit=max&s=a84d55a053bad561a57034beff1f1243");
        locPic.attr("alt", locData[0] + " picture");
        cardImage.append(locPic);
        var locName = $("<span>");
        locName.text(locData[0]);
        locName.addClass("card-title");
        cardImage.append(locName);
        locDiv.append(cardImage);
        var cardContent = $("<div>");
        cardContent.addClass("card-content");
        var locDimension = $("<p>");
        locDimension.text("Dimension: " + locData[1]);
        cardContent.append(locDimension);
        locPeople = $("<p>");
        locPeople.attr("data-people", JSON.stringify(people));
        locPeople.text("Click to view the " + people.length + " characters in this location.");
        locPeople.addClass("peopleLink")
        cardContent.append(locPeople);
        locDiv.append(cardContent);
        colDiv.append(locDiv);
        //console.log(response);
        //console.log(locData);
        console.log("Created: " +response.id+" "+ locData[0]);


        return colDiv;
    }//if not null

}//createLocation

function createEpisodeElement(response) {
    if (response != null) {

        var epData = parseEpisodeData(response);
        var people = epData[2];

        for (let i = 0; i < people.length; i++) {
            people[i] = getLinkId(people[i]);
        }//for

        var colDiv = $("<div>");
        colDiv.addClass("col");
        var epDiv = $("<div>");
        epDiv.addClass("card");
        var cardImage = $("<div>");
        cardImage.addClass("card-image");
        var epPic = $("<img>");
        epPic.attr("src", "https://i.guim.co.uk/img/media/b563ac5db4b4a4e1197c586bbca3edebca9173cd/0_12_3307_1985/master/3307.jpg?width=300&quality=85&auto=format&fit=max&s=a84d55a053bad561a57034beff1f1243");
        epPic.attr(epData[0] + " picture");
        cardImage.append(epPic);
        var epName = $("<span>");
        epName.addClass("card-title");
        epName.text(epData[0]);
        cardImage.append(epName);
        var cardContent = $("<div>");
        cardContent.addClass("card-content");
        var epSeason = $("<p>");
        epSeason.text(epData[1]);
        cardContent.append(epSeason);
        var epChars = $("<p>");
        epChars.text("Click to view the " + people.length + " characters in this episode");
        epChars.attr("data-people", JSON.stringify(people));
        epChars.addClass("peopleLink")
        cardContent.append(epChars);
        epDiv.append(cardImage);
        epDiv.append(cardContent);
        colDiv.append(epDiv);
        console.log("Created: " + epData[0]);
        return colDiv;
    }//if not null

}//create episode


function parseCharacterData(data) {

    var charData = [];

    charData.push(data.name);
    charData.push(data.location);
    charData.push(data.episode);
    charData.push(data.image);
    charData.push(data.url);
    //console.log(charData);
    return charData;
}

function parseEpisodeData(data) {
    var epData = [];

    epData.push(data.name);
    epData.push(data.episode);
    epData.push(data.characters);
    return epData;
}

function parseLocationData(data) {
    var locData = [];

    locData.push(data.name);
    locData.push(data.dimension);
    locData.push(data.residents);
    return locData;
}

//takes in url from object and returns the id
function getLinkId(url) {

    var id = url.slice(url.lastIndexOf('/') + 1, url.length);
    //console.log("ID= " + id);
    return id;

}//get link id

function characterSearch(input) {
    var numCheck = parseInt(input);
    if (parseInt(numCheck) > 0 && numCheck < 494) {
        
        displayCharacters(numCheck,false);
    }//if id
    else {
        $(cardTarget).empty();
        $.ajax({
            url: characterURL+"?name="+input,
            method:"GET"
        }).done(function(response){
            console.log(response);
        
            for(let i=0;i<response.results.length;i++){
            appendCard(createCharacterElement(response.results[i]));
            }
        
        }).fail(function(response){
            appendCard("<h1> No Results </h1>");

        });

    }//else name

}//characterSearch

function episodeSearch(input) {
    var numCheck = parseInt(input);
    if (parseInt(numCheck) > 0 && numCheck < 32) {
        console.log("ID="+numCheck);
        displayEpisodes(numCheck);
    }//if id
    else {
        $(cardTarget).empty();
        $.ajax({
            url: episodeURL+"?name="+input,
            method:"GET"
        }).done(function(response){
            console.log(response);
        
            for(let i=0;i<response.results.length;i++){
                appendCard(createEpisodeElement(response.results[i]));
            }
        
        }).fail(function(response){
            appendCard("<h1> No Results </h1>");

        });
    }//else name
}

function locationSearch(input) {
    var numCheck = parseInt(input);
    if (parseInt(numCheck) > 0 && numCheck < 77) {
        console.log("ID="+numCheck);
        displayLocations(numCheck);
    }//if id
    else {
        $(cardTarget).empty();
        $.ajax({
            url: locationURL+"?name="+input,
            method:"GET"
        }).done(function(response){
            console.log(response);
        
            for(let i=0;i<response.results.length;i++){
                appendCard(createLocationElement(response.results[i]));
            }
        
        }).fail(function(response){
            appendCard("<h1> No Results </h1>");
        });
    }//else name
}//locationSearch
