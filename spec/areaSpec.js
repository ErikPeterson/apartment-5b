var Area = require('../js/area.js');

describe('Area', function(){
  describe('dimensions', function(){
    var area;

    beforeEach(function(){
      area = new Area(5, 5);
    });

    it('are assigned on initialization', function(){
      expect(area.width).toEqual(5);
      expect(area.height).toEqual(5);
    });

    it('are immutable', function(){
      area.width = 25;
      area.height = 45;
      expect(area.width).toEqual(5);
      expect(area.height).toEqual(5);
    });
  });

  describe('#addTile(tile, x, y)', function(){
    var area;

    beforeEach(function(){
      area = new Area(5, 5);
    });

    it("adds a tile to the area at the specified x y position (top-left origin, 0 based)", function(){
      var tile = {walkable: false, empty: true}
      area.addTile(tile, 0, 1);
      expect(area.getTile(0, 1)).toEqual(tile);
    });

    it("throws an error if the specified x y position is outside the bounds of the grid", function(){
      var tile = {walkable: true, empty: false};
      expect(function(){area.addTile(tile, 25, 25)}).toThrow(new Error("Coordinates must be inside bounds of grid area."))
    })

  });

  describe('#getTile(x, y)', function(){
    var area, tile1, tile2;

    beforeEach(function(){
      area = new Area(5, 5);
      tile1 = {walkable: false, empty: true};
      tile2 = {walkable: true, empty: false};
      area.addTile( tile1, 0, 1 );
      area.addTile( tile2 , 3, 2);
    });

    it("returns the tile at the specified x y position (top-left origin, 0 based)", function(){
      expect(area.getTile(0,1)).toEqual(tile1);
      expect(area.getTile(3,2)).toEqual(tile2);
    });

    it("throws an error if the specified x y position is outside the bounds of the grid", function(){
      expect(function(){area.getTile(25, 25)}).toThrow(new Error("Coordinates must be inside bounds of grid area."))
    });

  });

});
