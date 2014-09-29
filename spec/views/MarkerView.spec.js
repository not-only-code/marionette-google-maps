describe('MarkerView', function() {
    beforeEach(function() {
        window.google = {};
        window.google.maps = {
            Marker: function () {
                return {
                    setMap: function() { return{}; }
                }
            },
            LatLngBounds: function(){ return{}; },
            Map: function(){ return{}; },
            MapTypeControlStyle: {
                DROPDOWN_MENU: ''
            },
            LatLng: function(){ return{};},
            InfoWindow: function(){ return{};},
            event: {
                addListener: function(){ return{};},
                removeListener: function(){ return{};}
            }
        };
        
        this.markerModel = new Backbone.Marionette.MarkerModel({
            title: "Marker 1",
            content: "Lorem ipsum dolor sit amet.",
            lat: 41.378158,
            lon: 2.155621
        });
        this.markerOptions = {
            map: {
                fitBounds: function(){return{};}
            },
            bounds: {
                extend: function(){return{};}
            },
            model: this.markerModel
        };
        this.markerView = new Backbone.Marionette.MarkerView(this.markerOptions);
    });
    
    it('should have a infowindow template', function() {
        expect(this.markerView.template).toBeDefined();
    });

    it('should show an error if there is not google.maps', function() {
        delete window.google;
        expect(function(){
             new Backbone.Marionette.MarkerView();
        }).toThrowError('MarkerView needs google maps library');
    });

    it('should show an error if there is not options.map', function() {
        expect(function(){
             new Backbone.Marionette.MarkerView({
                model: this.markerModel,
                bounds: {
                    extend: function(){return{};}
                }
             });
        }).toThrowError('MarkerView needs a \'options.map\' object');
    });

    it('should show an error if there is not options.bounds', function() {
        expect(function(){
             new Backbone.Marionette.MarkerView({
                model: this.markerModel,
                map: {
                    fitBounds: function(){return{};}
                }
             });
        }).toThrowError('MarkerView needs a \'options.map\' object');
    });

    it('should show Error if there is not model', function() {
        expect(function(){
             new Backbone.Marionette.MarkerView({
                map: {
                    fitBounds: function(){return{};}
                },
                bounds: {
                    extend: function(){return{};}
                }
             });
        }).toThrowError('This view needs a model with \'lat\' and \'lon\' attributes');
    });


    it('should show Error if \'lat\' attribute is null', function() {
        expect(function(){
            var markerModel = new Backbone.Marionette.MarkerModel({
                title: "Marker 1",
                content: "Lorem ipsum dolor sit amet.",
                lon: 2.155621
            });
            new Backbone.Marionette.MarkerView({
                map: {
                    fitBounds: function(){return{};}
                },
                bounds: {
                    extend: function(){return{};}
                },
                model: markerModel
            });
        }).toThrowError('This view needs a model with \'lat\' and \'lon\' attributes');
    });

    it('should show Error \'lon\' attribute is null', function() {
        expect(function(){
            var markerModel = new Backbone.Marionette.MarkerModel({
                title: "Marker 1",
                content: "Lorem ipsum dolor sit amet.",
                lat: 41.378158
            });
            new Backbone.Marionette.MarkerView({
                map: {
                    fitBounds: function(){return{};}
                },
                bounds: {
                    extend: function(){return{};}
                },
                model: markerModel
            });
        }).toThrowError('This view needs a model with \'lat\' and \'lon\' attributes');
    });

    it('should have a \'openWindow\' method', function() {
        expect(this.markerView.openWindow).toBeDefined();
    });

    it('should have a \'closeWindow\' method', function() {
        expect(this.markerView.closeWindow).toBeDefined();
    });
});