var SAT = require('./SAT.min.js');
var Vector = SAT.Vector;
var _ = require('lodash');

exports.makeVector = function (point){
    return new Vector(point.x, point.y);
};

exports.createImage = function (img, queuer){
  var url = (typeof img === "object") ? img : undefined;

  if(url){
    img = new Image();
    img.src = url;
  }

  if(queuer){
    queuer(img);
  }

  return img;
};

exports.addClass = function (classname, el){
    var regex = new RegExp("\\s?" + classname + "\\s?"),
        classlist = el.getAttribute('class') || '';

        if(!regex.test(classlist)){
            if(classlist === ''){    
                el.setAttribute('class', classname);
            } else {
                el.setAttribute('class', classlist + ' ' + classname);
            }
        }
};

exports.removeClass = function (classname, el){
    var regex = new RegExp("\\s?(" + classname + ")\\s?"),
        classlist = el.getAttribute('class') || '',
        match = classlist.match(regex);

        if(match){
            el.setAttribute('class', classlist.replace(match[0], '').trim().replace(/\s{2,}/g, ' '));
        }
};

module.exports = exports;