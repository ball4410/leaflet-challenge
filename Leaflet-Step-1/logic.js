//Store API endpoint
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Perform GET request to the query URL
d3.json(queryUrl).then(function(data) {
    //Send data.features object to createFeatures function
    createFeatures(data.features);
});

function createFeatures(earthquakeData){
    //Gives each feature a descriptive popup
    function onEachFeature(feature, layer){
        layer.bindPopup("<h4>" + feature.properties.place +
            "</h4><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    //Create GeoJSON layer that runs onEachFeatures function for each data instance
    var earthquakes = L.geoJSON(earthquakes, {
        onEachFeature: onEachFeature
    });

    //Send earthquakes layer to createMap function
    createMap(earthquakes);
}

function createMap(earthquakes){
    //Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1, 
        id: "mapbox/streets-v11",
        accessToken: API_KEY
}); 

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

}