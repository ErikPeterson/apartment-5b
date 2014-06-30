var SAT = require('./SAT.min.js');
var Vector = SAT.Vector;
var _ = require('lodash');

exports.makeVector = function (point){
    return new Vector(point.x, point.y);
};

exports.createImage = function (url, queuer){
  var img = new Image();
  if(queuer){
    queuer(img);
  }
  img.src = url;
  return img;
};

module.exports = exports;