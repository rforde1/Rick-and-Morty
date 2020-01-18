const baseURL = "https://rickandmortyapi.com/api/";
const characterURL = baseURL + "character/";
const locationURL = baseURL + "location/";
const episodeURL = baseURL + "episode/";




$("#char").click(createCharacterElement);
$("#ep").click(createEpisodeElement);
$("#loc").click(createLocationElement);


function createCharacterElement(id) {

    $.ajax({
        url: characterURL + "1",
        method: "GET"
    }).done(function (response) {
        console.log("Character");
        console.log(response);
       var charData= parseCharacterData(response);
        // console.log(charData);
       let eps=charData[2];
       for(let i=0;i<eps.length;i++){
           eps[i]=getLinkId(eps[i]);
       }//for
    //    console.log(eps);

    });

}//create character

function createEpisodeElement(id) {

    $.ajax({
        url: locationURL + "1",
        method: "GET"
    }).done(function (response) {
        console.log("Location")
        console.log(response);
        parseEpisodeData(response);
    });


}//create episode

function createLocationElement(id) {
    $.ajax({
        url: episodeURL + "1",
        method: "GET"
    }).done(function (response) {
        console.log("Episode")
        console.log(response);
        parseLocationData(response);
    });


}//createLocation

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
    locData.push(data.type);
    locData.push(data.residents);
    return locData;
}

//takes in url from object and returns the id
function getLinkId(url) {

    var id = url.slice(url.lastIndexOf('/') + 1, url.length);
    console.log("ID= " + id);
    return id;

}
