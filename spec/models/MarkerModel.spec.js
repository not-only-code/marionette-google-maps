describe('MarkerModel', function() {
    beforeEach(function() {
       this.markerModel = new Backbone.Marionette.MarkerModel({});
    });
    
    it('should have a empty \'title\'', function() {
        expect(this.markerModel.get('title')).toBe('');
    });
    
    it('should have a empty \'content\'', function() {
        expect(this.markerModel.get('content')).toBe('');
    });

    it('should have a null \'lat\'', function() {
        expect(this.markerModel.get('lat')).toBe(null);
    });
    
    it('should have a null \'lon\'', function() {
        expect(this.markerModel.get('lon')).toBe(null);
    });

});