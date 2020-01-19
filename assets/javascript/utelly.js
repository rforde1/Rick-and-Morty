// Grab placeholders elements
var container = $(".container");
var buttonDiv = $("#buttons");

// Create array for countries
var countries = ["uk", "us", "ar", "at", "au", "be", "br", "ca", "ch", "cz", "dk", "de", "ee", "es", "fr", "hk", "hu", "ie", "il", "in", "is", "it", "jp", "kr", "lt", "lv", "mx", "nl", "no", "nz", "ph", "pl", "pt", "ro", "ru", "se", "sg", "sk", "th" ,"za"];
for(var i = 0; i < countries.length; i ++) {
    var btnDiv = $("<div>").addClass("col l6 s6 xs6");
    var button = $("<button>").text(countries[i]).addClass("waves-effect waves-light btn");
    button.attr("data-country", countries[i]);
    btnDiv.append(button);
    buttonDiv.append(btnDiv);


}

