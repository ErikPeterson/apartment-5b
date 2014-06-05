var Tile = function(w){
  if(w !== undefined){
    this.walkable = w;
  }
}

Tile.prototype.walkable = true;

module.exports = exports = Tile;
