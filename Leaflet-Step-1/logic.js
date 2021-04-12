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
}