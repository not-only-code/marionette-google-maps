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