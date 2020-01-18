const baseURL = "https://rickandmortyapi.com/api/";
const characterURL = baseURL + "character/";
const locationURL = baseURL + "location/";
const episodeURL = baseURL + "episode/";

var test = [6];



$("#char").click(function(){displayCharacters(test)});
$("#ep").click(function(){displayEpisodes(test)});
$("#loc").click(function(){displayLocations(test)});




function displayCharacters(people){
    $.ajax({
        url: characterURL + people,
        method: "GET"
    }).done(function(response){

        

        for(var i=0; i<people.length;i++){
          $("#cardContainer").append(createCharacterElement(response));

        }

    });
}//display characters

function displayEpisodes(epsodes){

}//display episodes

function displayLocations(locations){
    $.ajax({
        url: locationURL + locations,
        method: "GET"
    }).done(function (response) {

        for(var i=0; i<locations.length; i++){
            $("#cardContainer").append(createLocationElement(response));
        }

    });
}


function createCharacterElement(response) {
    
        console.log("Character");
        console.log(response);
       var charData= parseCharacterData(response);
        console.log(charData);
       let eps=charData[2];
       for(let i=0;i<eps.length;i++){
           eps[i]=getLinkId(eps[i]);
       }//for

       var charDiv=$("<div>");
       var charPic = $("<img>");
       charPic.attr("src",charData[3]);
       charDiv.append(charPic);
       var charName = $("<h4>");
       charName.text(charData[0]);
       charDiv.append(charName);
       var charLoc = $("<p>");
       charLoc.text("Location: "+charData[1].name);
       charLoc.attr("data-location",getLinkId(charData[1].url));
       charDiv.append(charLoc);
       var episodes = $("<p>");
       episodes.text("Click to view the "+eps.length+" episode(s) this character is in");
       episodes.attr("data-episodes",eps);
       charDiv.append(episodes);

       return charDiv;


}//create character


function createLocationElement(response) {
   var locData= parseLocationData(response);
   var people = locData[2];

   for(let i=0; i<people.length;i++){
       people[i] = getLinkId(people[i]);
   }//for each person

   var locDiv = $("<div>");
   var locPic= $("<img>");
   locPic.attr("src","https://i.guim.co.uk/img/media/b563ac5db4b4a4e1197c586bbca3edebca9173cd/0_12_3307_1985/master/3307.jpg?width=300&quality=85&auto=format&fit=max&s=a84d55a053bad561a57034beff1f1243");
    locDiv.append(locPic);
    var locName = $("<h4>"); 
    locName.text(locData[0]);
    locDiv.append(locName);
    var locDimension = $("<p>");
    locDimension.text(locData[1]);
    locDiv.append(locDimension);
    locPeople = $("<p>");
    locPeople.attr("data-people",people);
    locPeople.text("Click to view the "+people.length+" people in this location.");
   locDiv.append(locPeople);
   console.log(response);
    console.log(locData);
   return locDiv;

}//createLocation

function createEpisodeElement(response) {




}//create episode


function parseCharacterData(data) {

    var charData=[];

    charData.push(data.name);
    charData.push(data.location);
    charData.push(data.episode);
    charData.push(data.image);
    console.log(charData);
    return charData;
}

function parseEpisodeData(data) {
    var epData=[];

    epData.push(data.name);
    epData.push(data.episode);
    epData.push(data.characters);
    return epData;
}

function parseLocationData(data) {
    var locData=[];

    locData.push(data.name);
    locData.push(data.dimension);
    locData.push(data.residents);
    return locData;
}

//takes in url from object and returns the id
function getLinkId(url) {

    var id = url.slice(url.lastIndexOf('/') + 1, url.length);
    console.log("ID= " + id);
    return id;

}
