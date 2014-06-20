var _ = require('lodash');
var createImage = require('./support.js').createImage;
var SAT = require('./SAT.min');

var Map = function(options, queuer){
  this.initialize(options, queuer);
};

Map.prototype.initialize = function(options, queuer){
  this.name = options.name;
  this.width = options.w;
  this.height = options.h;
  this.queuer = queuer;
  this.image = createImage(options.image, this.queuer);
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
    el.image = createImage(el.image, this.queuer);
    return el;
  }, this);
  return _.sortBy(Objs, function(el){return el.cutoff;});
};

Map.prototype.render = function(character, ctx, mode){
  var toggle = 0;
  ctx.drawImage(this.image, 0, 0);
  _.each(this.objs, function(obj){
      if(toggle === 0){
        if(character.maxy() <= obj.cutoff){
          toggle = 1;
          character.render(ctx);
          ctx.drawImage(obj.image, obj.x, obj.y);
        } else{
          ctx.drawImage(obj.image, obj.x, obj.y);
        }
      } else{
          ctx.drawImage(obj.image, obj.x, obj.y);
      }
  }, this);
  if(toggle === 0){
    character.render(ctx);
  }
  if(mode){
      ctx.fillStyle = 'rgba(255, 0, 0, 0.25);';
    _.each(this.blocks, function(block){
      ctx.beginPath();
      ctx.moveTo(block.points[0].x, block.points[0].y);
      for(var i = 1; i < block.points.length; i++){
        ctx.lineTo(block.points[i].x, block.points[i].y);
      }
      ctx.lineTo(block.points[0].x, block.points[0].y);
      ctx.closePath();
      ctx.fill();
    }, this);
  }
};



module.exports = exports = Map;
