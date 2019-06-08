// Define satellite, grayscale & outdoor layers
var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
});

var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.gray",
    accessToken: API_KEY
});

var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoor",
    accessToken: API_KEY
});

//  get request for ward data
d3.json("static/data/Toronto_44_Wards.json", function(data){
    var wardFeatures = data.features
    
    // save ward layer made from geojson, 
    var wards = L.geoJSON(wardFeatures , {
        // Style each feature (in this case a neighborhood)
        style: function(feature) {
        return {
            color: "blue",
            fillOpacity: 0,
            weight: 1.5
        };
        },
        // Called on each feature
        onEachFeature: function(feature, layer) {
        // Set mouse events to change map styling
        layer.on({
            // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes so that it stands out
            mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
                fillOpacity: 0.6
            });
            },
            // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back light
            mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
                fillOpacity: 0.1
            });
            },
        });
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h6>" + feature.properties.TYPE_DESC + " " + feature.properties.NAME + "</h6>");
        }
    });

    d3.json("/map/crime18", function(data){

        // Create a new marker cluster group
        var markers18 = L.markerClusterGroup({spiderfyOnMaxZoom:false,
            disableClusteringAtZoom: 16,
            polygonOptions: {
                color: '#2d84c8',
                weight: 4,
                opacity: 1,
                fillOpacity: 0.5
            },
    
            iconCreateFunction: function(cluster) {
                var count = cluster.getChildCount();
                
                var digits = (count+'').length;
        
                return new L.DivIcon({
                    html: count,
                    className:'cluster digits-'+digits,
                    iconSize: null
                });
            },});

            var violetIcon = new L.Icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
    
        // Loop through data
        for (var i = 0; i < data.length; i++) {
    
        // Add a new marker to the cluster group and bind a pop-up
        markers18.addLayer(L.marker([data[i].Lat, data[i].Long], {icon: violetIcon})
        .bindPopup("<h6>" + data[i].Neighbourhood + "</h6><hr><h6>" + data[i].crime + "</h6>"));
    
        }
    
    d3.json("/map/crime14", function(data){

    // Create a new marker cluster group
    var markers14 = L.markerClusterGroup({spiderfyOnMaxZoom:false,
        disableClusteringAtZoom: 16,
        polygonOptions: {
            color: '#2d84c8',
            weight: 4,
            opacity: 1,
            fillOpacity: 0.5
        },

        iconCreateFunction: function(cluster) {
            var count = cluster.getChildCount();
            
            var digits = (count+'').length;
    
            return new L.DivIcon({
                html: count,
                className:'cluster2 digits-'+digits,
                iconSize: null
            });
        },});
    
        var greenIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

    // Loop through data
    for (var i = 0; i < data.length; i++) {

    // Add a new marker to the cluster group and bind a pop-up
    markers14.addLayer(L.marker([data[i].Lat, data[i].Long], {icon: greenIcon})
    .bindPopup("<h6>" + data[i].Neighbourhood + "</h6><hr><h6>" + data[i].crime + "</h6>"));

    }

    createMap(wards, markers14, markers18)
    })
})

});

function getColor(d)  {
    switch (d) {
        case "Major Crimes 2014":
            return "#067c63";
        case "Marjor Crimes 2018":
            return "#610374";
        default:
            return "#610374";
        }
}


function createMap(wards, markers14, markers18){
    var baseMaps = {
    "Outdoor Map": outdoorsMap,
    "Grayscale Map": lightMap,
    "Satelite Map": satelliteMap
};

var overlayMaps = {
    "Toronto Wards": wards,
    "Major Crime 2014": markers14,
    "Major Crime 2018": markers18
};

var mymap = L.map("map", {
    center: [43.718296, -79.336064],
    zoom: 11,
    layers: [outdoorsMap, wards]
}); 

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["Major Crimes 2014", "Marjor Crimes 2018"],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i] + (grades[i]? '<br><br>' : '+');
    }

    return div;
};

legend.addTo(mymap);

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(mymap);
}