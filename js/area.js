var Area = function(w, h){
  if(!w || !h){
    throw new Error("Area cannot be constructed without a width or height")
  }

  Object.defineProperty(this, 'width', {
    configureable: false,
    enumerable: true,
    value: w,
    writable: false
  })

  Object.defineProperty(this, 'height', {
    configureable: false,
    enumerable: true,
    value: h,
    writable: false
  })

  this.__initialize();
};

Area.prototype.__initialize = function () {
  this.__grid = makeGrid(this.width, this.height);
};

Area.prototype.addTile = function (tile, x, y) {
  if(x < 0 || y < 0 || x >= this.width || y >= this.height) throw new Error("Coordinates must be inside bounds of grid area.");
  this.__grid[y][x] = tile;
};

Area.prototype.getTile = function(x, y) {
  if(x < 0 || y < 0 || x >= this.width || y >= this.height) throw new Error("Coordinates must be inside bounds of grid area.");
  return this.__grid[y][x];
};

function makeGrid (w, h){
  var grid = [],
      i = 0,
      ii = 0;

    while(i < h){
      grid.push([])
      while(ii < w){
        grid[i].push({walkable: false, empty: true});
        ii++;
      }
      ii = 0;
      i++;
    }

  return grid;
}


module.exports = exports = Area;
