var exports;
var createImage = require('./createImage');

var Sprite = function(address, w, h){
  return {
    dw: w,
    dh: h,
    img: createImage(address),
    standing: {
      front: {
        sx: 3 * w,
        sy: 0
      },
      back: {
        sx: 2 * w,
        sy: 0
      },
      right: {
        sx: 1 * w,
        sy: 0
      },
      left: {
        sx: 0 * w,
        sy: 0
      }
    }, walking: {
      front: [{sx: 3 * w, sy: 1 * h},{sx: 3 * w, sy: 2 * h},{sx: 3 * w, sy: 3 * h},{sx: 3 * w, sy: 4 * h}],
      back: [{sx: 2 * w, sy: 1 * h},{sx: 2 * w, sy: 2 * h},{sx: 2 * w, sy: 3 * h},{sx: 2 * w, sy: 4 * h}],
      right: [{sx: 1 * w, sy: 1 * h},{sx: 1 * w, sy: 2 * h},{sx: 1 * w, sy: 3 * h},{sx: 1 * w, sy: 4 * h}],
      left: [{sx: 0 * w, sy: 1 * h},{sx: 0 * w, sy: 2 * h},{sx: 0 * w, sy: 3 * h},{sx: 0 * w, sy: 4 * h}]
    }
  }
};

module.exports = exports = Sprite;
