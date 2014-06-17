var exports;

function createImage(url, queuer){
  var img = new Image();
  if(queuer){
    queuer(img);
  }
  img.src = url;
  return img;
}

module.exports = exports = createImage;
