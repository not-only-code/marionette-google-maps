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