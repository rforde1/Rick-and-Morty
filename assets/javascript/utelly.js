// Grab placeholders elements
var container = $(".container");
var buttonDiv = $("#buttons");

// Random background-image for body
// https://stackoverflow.com/questions/15231812/random-background-images-css3-- refrence
// updated gifs 
var images = ["https://i.pinimg.com/originals/41/98/6f/41986f9c72367582c22c97989144dd9c.gif", 
            "https://cdnb.artstation.com/p/assets/images/images/020/740/709/original/win-dolores-ricknmorty-gif.gif?1568981763", 
            "https://66.media.tumblr.com/3d053da9b5b9eef2681ac1b0924f4ff2/tumblr_p60mgpdYwb1u0cbvdo2_500.gifv", 
             "https://wallpaperscute.com/wp-content/uploads/2018/04/HD-Rick-Morty-Backgrounds.jpg"];
$("body").css({"background-image": "url(" + images[Math.floor(Math.random() * images.length)] + ")"});
console.log("Images");

// Create array for countries   
var countries = ["uk", "us", "ar", "at", "au", "be", "br", "ca", "ch", "cz", "dk", "de", "ee", "es", "fr", "hk", "hu", "ie", "il", "in", "is", "it", "jp", "kr", "lt", "lv", "mx", "nl", "no", "nz", "ph", "pl", "pt", "ro", "ru", "se", "sg", "sk", "th" ,"za"];
for(var i = 0; i < countries.length; i ++) {
    var btnDiv = $("<div>").addClass("col l6 s6 xs6");
    var button = $("<button>").text(countries[i]).addClass("waves-effect waves-light btn");
    button.attr("data-country", countries[i]);
    btnDiv.append(button);
    buttonDiv.append(btnDiv);
}

$("#buttons").on("click","button",function(){
  var currentCountry =   $(this).attr("data-country");
  displayCountry(currentCountry);
  console.log(currentCountry);
});




// Geo-location API - get user longitude and latitude based on this api 
navigator.geolocation.getCurrentPosition(ifSuccess,ifError)



// Function ifSuccess() = user selects 'yes' to allowing current location

function ifSuccess(response){
// console.log("Hello");
console.log(response);
console.log(response.coords.latitude);
console.log(response.coords.longitude);

var latitude = response.coords.latitude;
var longitude = response.coords.longitude;

// Reverse Geo-Location API
var reverseGeolocation = {
	"async": true,
	"crossDomain": true,
	"url": "https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=" +latitude + "&longitude=" + longitude +"&range=0",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "geocodeapi.p.rapidapi.com",
		"x-rapidapi-key": "931da4b7f6mshf64a780e7f7aee4p1a4259jsnec3d16787fa8"
	}
}

$.ajax(reverseGeolocation).then(function(res){
    console.log(res);
    var yourLocation = res[0].CountryId;
    console.log(yourLocation);
    // console.log("it worked");
    if (countries.includes(yourLocation)){
        displayCountry(yourLocation);
    }else{
        displayCountry("us");
    }
    
  

  });
}

// Function ifError() = is user selects 'no' to allowing current location
function ifError(){

}
function displayCountry(countryId){
    $("#where-to-watch").empty();

    var utellyApi = {
        "async": true,
        "crossDomain": true,
        "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=rick%20and%20morty&country=" + countryId,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key": "931da4b7f6mshf64a780e7f7aee4p1a4259jsnec3d16787fa8"
        }
    }
    //   Utelly API 
    $.ajax(utellyApi).done(function (response){
        console.log(response);
        // console.log(response.results[0].locations);
        if( response.results.length < 1){
            console.log(response);
    var watchNameDiv = $("<h1>")
    watchNameDiv.text(" NO RESULT!");
    var resultDiv = $("<div>");
    resultDiv.append(watchNameDiv);
    $("#where-to-watch").append(resultDiv);
    console.log("It worked");
        } else{

            for(var i = 0; i < response.results[0].locations.length; i ++){
                // Icon Img
                var iconImg = response.results[0].locations[i].icon;
                var iconImgDiv = $("<img>").attr("src", iconImg);
                var icon = $("<div>");
                icon.append(iconImgDiv);
                // console.log("hellooo");
                
                // Name of where to watch
                var watchName = response.results[0].locations[i].display_name;
                var watchNameDiv = $("<div>").addClass("watch-name");
                watchNameDiv.text(watchName);
                // console.log("helll1");
                
                
                // Where to watch Link
                
                var watchLink = response.results[0].locations[i].url
                var watchLinkDiv= $("<a>").attr("href", watchLink).addClass("watch-link");
                watchLinkDiv.text(watchLink);
                // console.log("helll3");
                // Append all divs  to $("#where to watch") ===== results based on which country user is in 
                $("#where-to-watch").append(icon, watchNameDiv, watchLinkDiv);
                
                
                
            } 
            }
        }).fail(function(response){
            console.log(response);
        var watchNameDiv = $("<h1>")
        watchNameDiv.text(" NO RESULT!");
        var resultDiv = $("<div>");
        resultDiv.append(watchNameDiv);
        $("#where-to-watch").append(resultDiv);
        console.log("It worked");
    });
    
}

