describe('MarkersCollection', function() {
    beforeEach(function() {
       this.markersCollection = new Backbone.Marionette.MarkersCollection();
    });
    
    it('model should be \'Backbone.Marionette.MarkerModel\'', function() {
        expect(this.markersCollection.model).toBe(Backbone.Marionette.MarkerModel);
    });
});