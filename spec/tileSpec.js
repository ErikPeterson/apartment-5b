var Tile = require('../js/tile.js');

describe("Tile", function(){
  describe("walkable", function(){
    it("defaults to true", function(){
      expect(new Tile().walkable).toEqual(true);
    });
    it("can be set on initialization", function(){
      expect(new Tile(false).walkable).toEqual(false);
    })
  });
})
