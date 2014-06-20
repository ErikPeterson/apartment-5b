var SAT = require('./SAT.min.js');

var makeVector = function (point){
    return new SAT.Vector(point.x, point.y);
};

var createImage = function (url, queuer){
  var img = new Image();
  if(queuer){
    queuer(img);
  }
  img.src = url;
  return img;
};

exports.makeVector = makeVector;
exports.createImage = createImage;

module.exports = exports;