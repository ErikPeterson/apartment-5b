var _ = require('lodash');
var createImage = require('./createImage');
var SAT = require('./SAT.min');

var Map = function(options){
  this.initialize(options);
};

Map.prototype.initialize = function(options){
  this.width = options.w;
  this.height = options.h;
  this.image = createImage(options.image);
  this.objs = this.loadObjects(options.objs);
  this.blocks = this.makeBoxes(options.blocks);
};

Map.prototype.makeBoxes = function(blocks){
  return _.map(blocks, function(el){
    el.points = _.map(el.points, function(point){
      return new SAT.Vector(point.x, point.y);
    });
    el.box = new SAT.Polygon(new SAT.Vector(el.offset.x, el.offset.y), el.points);
    return el;
  }, this);
};

Map.prototype.loadObjects = function(objs){
  var Objs = _.map(objs, function(el){
    el.image = createImage(el.image);
    return el;
  }, this);
  return _.sortBy(Objs, function(el){return el.cutoff;});
};

Map.prototype.render = function(character, ctx){
  var toggle = 0;
  ctx.drawImage(this.image, 0, 0);

  _.each(this.objs, function(obj){
      if(toggle === 0){
        if(character.maxy() <= obj.cutoff){
          toggle = 1;
          character.render(ctx);
          ctx.drawImage(obj.image, obj.x, obj.y);
        }else if(character.maxy() > obj.cutoff){
          toggle = 1;
          ctx.drawImage(obj.image, obj.x, obj.y);
          character.render(ctx);
        } else{
          ctx.drawImage(obj.image, obj.x, obj.y);
        }
      }
  }, this);
};

module.exports = exports = Map;
