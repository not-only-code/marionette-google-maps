/**
 * Google maps helpers for MarionetteJS
 * 0.0.1
 *
 * 2014 Carlos Sanz Garcia
 * Distributed under MIT license
 *
 * https://github.com/not-only-code/marionette-google-maps
 */
;(function() {
"use strict";

Backbone.Marionette.MarkerModel = Backbone.Model.extend({
    defaults: {
        title: '',
        content: '',
        lat: null,
        lon: null
    }
});
Backbone.Marionette.MarkersCollection = Backbone.Collection.extend({
    model: Backbone.Marionette.MarkerModel
});
Backbone.Marionette.MarkerView = Backbone.Marionette.ItemView.extend({

    template: '<h2><%= title %></h2><div class="content"><%= content %></div>',

    constructor: function(options) {

        if (!google.maps || !options.map) {
            this.destroy();
            return;
        }

        Backbone.Marionette.ItemView.apply(this, arguments);

        this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.model.get('lat'), this.model.get('lon')),
            map: this.options.map,
            title: this.model.get('title')
        });

        this.options.bounds.extend(this.marker.position);
        this.options.map.fitBounds(this.options.bounds);

        this.infowindow = new google.maps.InfoWindow({
            content: _.template(this.template, this.model.toJSON())
        });

        // google events way
        this.markerListener = google.maps.event.addListener(this.marker, 'click', _.bind(this.openWindow, this));
        this.mapListener = google.maps.event.addListener(this.options.map, 'open:infowindow', _.bind(this.closeWindow, this));

        return this;
    },
    render: function() {
        return this.marker;
    },

    openWindow: function() {
        google.maps.event.trigger(this.options.map, 'open:infowindow');
        this.infowindow.open(this.options.map, this.marker);
    },

    closeWindow: function() {
        this.infowindow.close();
    },

    remove: function() {
        this.stopListening();
        google.maps.event.removeListener(this.markerListener);
        google.maps.event.removeListener(this.mapListener);
        if (this.$el) {
            this.$el.remove();
        }
        this.marker.setMap(null);
        delete this.marker;
        return this;
    }
});
Backbone.Marionette.MapView = Backbone.Marionette.CollectionView.extend({
    el: '#map',
    childView: Backbone.Marionette.MarkerView,
    options: {},
    bounds: null,
    mapOptions: {
        zoom: 13,
        maxZoom: 16,
        attributionControl: false,
        panControl: false,
        scaleControl: true
    },
    constructor: function(options) {

        if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
            throw new Error('MapView needs google maps library');
        }

        Backbone.Marionette.CollectionView.apply(this, arguments);

        // creates the map
        this.setMapOptions();
        this.bounds = new google.maps.LatLngBounds();
        this.map = new google.maps.Map(this.$el[0], this.mapOptions);

        // child options options
        this.childViewOptions = {
            map: this.map,
            bounds: this.bounds
        };

        return this;
    },
    initialize: function() {
        return this;
    },
    setMapOptions: function() {
        // map options
        if (this.options.lat && this.options.lon) {
            this.mapOptions.center = new google.maps.LatLng(this.options.lat, this.options.lon);
        }

        this.mapOptions.mapTypeControlOptions = {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        };
    },
    render: function() {
        return this.$el;
    },
    onRender: function() {
        this.map.fitBounds(this.bounds);
    },
    refreshResize: function() {
        google.maps.event.trigger(this.map, 'resize');
        this.map.fitBounds(this.bounds);
    }
});
})(window || global || this);
//# sourceMappingURL=marionette-google-maps.js.map