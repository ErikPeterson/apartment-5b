var Sprite = require('./sprite');
var SAT = require('./SAT.min.js');
var _ = require('lodash');
var exports;

var Character = function(options){
    this.initialize(options);
};

Character.prototype.initialize = function(options){
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.h = options.h;
  this.w = options.w;
  this.sprite = new Sprite(options.sprite, this.w, this.h);
  this.state = "standing";
  this.direction = "front";
  this.ticker = 0;
};


Character.prototype.render = function(ctx){
  var state = this.getSpriteState();

  ctx.drawImage(this.sprite.img, state.sx, state.sy, this.sprite.dw, this.sprite.dh, this.x, this.y, this.sprite.dw, this.sprite.dh);
};

Character.prototype.tick = function(blocks){
  if(this.state === 'walking'){
    this.move(blocks);
  }
  return (this.ticker === 3 ? this.ticker = 0 : this.ticker++);
};

Character.prototype.go = function (dir, desired, blocks){
    var collisons,
        exits = [],
        box = new SAT.Box(new SAT.Vector(desired.x, desired.y + (this.h - 2)), this.w, 2 ).toPolygon();

    function testBox(block){
      return SAT.testPolygonPolygon(box, block.box);
    }

    collisions = _.filter(blocks, function(block){
      return SAT.testPolygonPolygon(box, block.box);
    });

    exits = _.filter(collisions, function(block){
      return block.exit;
    });

    if(exits.length > 0){
      return this.exit(exits[0]);
    }


    while(collisions.length > 0){
      desired = reduceByOne(dir, desired);
      box = new SAT.Box(new SAT.Vector(desired.x, desired.y + (this.h - 2)), this.w, 2 ).toPolygon();
      collisions = _.filter(collisions, testBox);
    }

    this.x = desired.x;
    this.y = desired.y;
};

Character.prototype.exit = function(exit){
  this.game.loadMap(exit.map);
};

function reduceByOne(dir, desired){
  switch (dir){
  case 'left':
    desired.x = desired.x + 1;
    break;
  case 'right':
    desired.x = desired.x - 1;
    break;
  case 'front':
    desired.y = desired.y - 1;
    break;
  case 'back':
    desired.y = desired.y + 1;
    break;
  }
  return desired;
}

Character.prototype.move = function(blocks){
  var diff = (this.ticker % 2 === 0) ? 8: 16;

    switch(this.direction){
    case 'left':
      this.go('left', { x: this.x - diff, y: this.y }, blocks);
      break;
    case 'front':
      this.go('front', { x: this.x, y: this.y + diff }, blocks);
      break;
    case 'right':
      this.go('right', { x: this.x + diff, y: this.y }, blocks);
      break;
    case 'back':
      this.go('back', { x: this.x, y: this.y - diff }, blocks);
      break;
    }
};



Character.prototype.getSpriteState = function(){
  if(this.state === 'standing'){
    return this.sprite.standing[this.direction];
  }
    return this.sprite.walking[this.direction][this.ticker];
};

Character.prototype.maxy = function(){
  return this.y + this.h;
};

module.exports = exports = Character;
