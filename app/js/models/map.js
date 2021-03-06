var _ = require('lodash');
var createImage = require('../support/functions.js').createImage;
var SAT = require('../support/SAT.min');
var Block = require('./block.js');

var Map = function(options, queuer){
  this.initialize(options, queuer);
};

Map.prototype.initialize = function(options, queuer){
  this.name = options.name;
  this.width = options.w;
  this.height = options.h;
  this.queuer = queuer;
  this.image = this.setImage(options.image);
  this.objs = (options.objs) ? this.loadObjects(options.objs) : [];
  this.blocks = (options.blocks) ? Block.makeGroup(options.blocks) : [];
};

Map.prototype.setImage = function(urlorimage){
  var mode = typeof urlorimage;
  if(mode === 'string'){
    return createImage(urlorimage);
  }
  this.queuer(urlorimage);
  return urlorimage;
};

Map.prototype.addBlock = function(block){
  this.blocks.push(Block.make(block));
};

Map.prototype.removeBlock = function(name){
  _.remove(this.blocks, {name: name});
};

Map.prototype.removeBlockGroup = function(group){
  _.remove(this.blocks, {group: group});
};

Map.prototype.loadObjects = function(objs){
  var Objs = _.map(objs, function(el){
    el.imagePath = el.image;
    el.image = createImage(el.image, this.queuer);
    return el;
  }, this);
  return _.sortBy(Objs, 'cutoff');
};

Map.prototype.addObj = function(obj){
  obj.imagePath = obj.image;
  obj.image = createImage(el.image, this.queuer);
  this.objs.splice(_.sortedIndex(this.objs, obj, 'cutoff'), 0, obj);
};

Map.prototype.removeObj = function(name){
  _.remove(this.objs, {name: name});
};

Map.prototype.toJSON = function(){
  return JSON.stringify({
    name: this.name,
    width: this.width,
    objs: _.map(this.objs, function(obj){
      return {cutoff: obj.cutoff, image: obj.imagePath};
    }),
    blocks: _.map(this.blocks, function(block){
      return block.toHash();
    })
  });
};


Map.prototype.render = function(ctx, mode, character){
  var toggle = 0;
  
  ctx.drawImage(this.image, 0, 0);

  if(character){

    _.each(this.objs, function(obj){
        if(toggle === 0 && character.maxy() <= obj.cutoff ){
            toggle = 1;
            character.render(ctx);
            ctx.drawImage(obj.image, obj.x, obj.y);
        } else{
            ctx.drawImage(obj.image, obj.x, obj.y);
        }
    });

    if(toggle === 0){
      character.render(ctx);
    }
  } else {
    _.each(this.objs, function(obj){ ctx.drawImage(obj.image, obj.x, obj.y); });
  }

  if(mode){
      ctx.fillStyle = 'rgba(255, 0, 0, 0.25);';
    _.each(this.blocks, function(block){
      ctx.beginPath();
      ctx.moveTo(block.box.points[0].x, block.box.points[0].y);
      for(var i = 1; i < block.box.points.length; i++){
        ctx.lineTo(block.box.points[i].x, block.box.points[i].y);
      }
      ctx.lineTo(block.box.points[0].x, block.box.points[0].y);
      ctx.closePath();
      ctx.fill();
    }, this);
  }
};



module.exports = exports = Map;
