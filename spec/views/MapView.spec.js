describe('MapView', function() {
    beforeEach(function() {
        window.google = {};
        window.google.maps = {
            LatLngBounds: function(){ return{}; },
            Map: function(){ return{}; },
            MapTypeControlStyle: {
                DROPDOWN_MENU: ''
            },
            LatLng: function(){ return{}; }
        };
        this.MapView = Backbone.Marionette.MapView.extend({
            initialize: function() {
                return this.map;
            }
        });
        this.mapView = new this.MapView();
    });

    it('\'childView\' should be \'Backbone.Marionette.MarkerView\'', function(){
        expect(this.mapView.childView).toBe(Backbone.Marionette.MarkerView);
    });

    it('should show an error if there is not google.maps', function() {
        delete window.google;
        expect(function(){
             new Backbone.Marionette.MapView();
        }).toThrowError('MapView needs google maps library');
    });

    it('should create a \'map\' object just after instantiate', function() {
        expect(this.mapView.map).toBeDefined();
    });

    it('should create a \'bounds\' object just after instantiate', function() {
        expect(this.mapView.bounds).toBeDefined();
    });

    it('map object should be available at initialize', function() {
        expect(this.mapView.initialize()).toBe(this.mapView.map);
    });

    it('should create \'childViewOptions\' with map and bounds', function() {
        expect(this.mapView.childViewOptions).toBeDefined();
        expect(this.mapView.childViewOptions.map).toBe(this.mapView.map);
        expect(this.mapView.childViewOptions.bounds).toBe(this.mapView.bounds);
    });

    it('should have \'refreshResize\' method', function() {
        expect(this.mapView.refreshResize).toBeDefined();
    });
});