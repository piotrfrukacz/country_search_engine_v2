$(function () {

    var url = 'https://restcountries.eu/rest/v1/name/';
    var countriesList = $('#countries');


    $('#search').click(searchCountries);
    $('#country-name').on( "keydown", function(event) {
        if(event.which == 13) 
            searchCountries();
    });

    function searchCountries() {
        var countryName = $('#country-name').val();
        if(!countryName.length) countryName = 'Poland';

        $.ajax({
            url: url + countryName,
            method: 'GET',
            success: showCountriesList
        });
    }

    function showCountriesList(resp) {

        countriesList.empty();
        resp.forEach(function(item) {
            var divCountry = $('<div>').addClass('country').appendTo(countriesList);
            var countryLeftSide = $('<div>').addClass('countryLeftSide');
            var countryRightSide = $('<div>').addClass('countryRightSide');
            var flag = item.alpha2Code;
            var sq = '\xB2';

            $('<img>').attr('src', "http://www.geonames.org/flags/x/" + flag.toLowerCase() + ".gif").appendTo(divCountry);

            $('<h1>').text(item.name + ", " + item.alpha3Code).appendTo(divCountry);

            countryLeftSide.appendTo(divCountry);  
            $('<div>').text('Population').appendTo(countryLeftSide);
            $('<div>').text('Capital').appendTo(countryLeftSide);
            $('<div>').text('Area').appendTo(countryLeftSide);
            $('<div>').text('Native Name').appendTo(countryLeftSide);
            $('<div>').text('Region').appendTo(countryLeftSide);
            $('<div>').text('Time Zone').appendTo(countryLeftSide);
            $('<div>').text('Domain').appendTo(countryLeftSide);

            countryRightSide.appendTo(divCountry);
            $('<div>').text(" : " + item.population).appendTo(countryRightSide);
            $('<div>').text(" : " + item.capital).appendTo(countryRightSide);
            $('<div>').text(" : " + item.area + " km" + sq).appendTo(countryRightSide);
            $('<div>').text(" : " + item.nativeName).appendTo(countryRightSide);
            $('<div>').text(" : " + item.region + " ," + item.subregion).appendTo(countryRightSide);
            $('<div>').text(" : " + item.timezones[0]).appendTo(countryRightSide);
            $('<div>').text(" : " + item.topLevelDomain[0]).appendTo(countryRightSide);
        });        
    }
});