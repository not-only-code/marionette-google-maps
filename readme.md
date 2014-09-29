#Marionette Google Maps

> Marionette Google Maps helps you to create maps and/with markers

With Marionette Google Maps helpers you can forget Google Maps API and work directly on markers collection. Each time you add or remove a marker on the collection the map will show or delete that marker and will fit his size to the current markers available.


## Installation

Run npm install ([**node**](http://nodejs.org) and [**npm**](https://npmjs.org) previously installed)

    $ npm install


**Build**

    $ grunt

**Test**

    $ grunt test

## Usage

Import the script ([google maps v3](https://developers.google.com/maps/documentation/javascript/?hl=es) required).
```html
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script><!-- load google maps first -->
<!-- all dependences here (jquery, usderscore, backbone, marionettejs) -->
<script src="marionette-googe-maps/dist/marionette-googe-maps.min.js"></script>
<script src="app.js"></script><!-- your application script -->
```

Create a map container
```html
<div id="my-map"></div>
```

Create a markers collection
```js
var markers = new Backbone.Marionette.MarkersCollection([
    {
        "title": "Marker 1",
        "content": "Lorem ipsum dolor sit amet.",
        "lat": 41.378158,
        "lon": 2.155621
    },
    {
        "title": "Marker 2",
        "content": "Lorem ipsum dolor sit amet, consectetur.",
        "lat": 41.385094,
        "lon": 2.156728
    },
    {
        "title": "Marker 3",
        "content": "Lorem ipsum dolor sit.",
        "lat": 41.405094,
        "lon": 2.154165
    }
]);
```
Initialize the Map view
```js
var myMapView = new Backbone.Marionette.MapView({
    el: '#my-map',
    collection: markers,
    lat: 41.385064, // initialize your map in theese coords
    log: 2.173403 // initialize your map in theese coords
});
```
It should render the map, show the markers and fit the map to the current markers. 


No matter when you load the data, **MapView** always will react to the **MarkersCollection** changes.
```js
var Markers = Backbone.Marionette.MarkersCollection.extend({
    url: 'http://marionettegooglemaps.apiary-mock.com/markers'
});
var markers = new Markers();
var myMapView = new Backbone.Marionette.MapView({
    el: '#my-map',
    collection: markers
});
markers.fetch();
```
