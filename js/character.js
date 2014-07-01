var Sprite = require('./sprite');
var Box = require('./SAT.min.js').Box;
var testPolygonPolygon = require('./SAT.min.js').testPolygonPolygon;
var makeVector = require('./support').makeVector;
var _ = require('lodash');
var exports;

var abs = Math.abs;

var Character = function(options){
    this.initialize(options);
};

Character.prototype.initialize = function(options, queuer){
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.h = options.h;
  this.w = options.w;
  this.sprite = new Sprite(options.sprite, this.w, this.h, queuer);
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

Character.prototype.go = function (dir, desired, blocks, diff){
    var i = 0,
        cur = {x: this.x, y: this.y},
        collisions,
        exit;

    function isExit (block){
      return block.blockType === 'exit';
    }

    for(i; i <= diff; i++){
      collisions = this.getCollisionsAtCoordinates(cur.x, cur.y, blocks);
      if(collisions){

        exits = _.filter(collisions, isExit);
        
        if(exits[0]){
          exit = exits[0];
          this.exit(exit.exit);
          return;
        }
        return;
      } else{
        this.x = cur.x;
        this.y = cur.y;

        cur = increaseByOne(dir, cur);
      }
    }
};


Character.prototype.getCollisionsAtCoordinates = function(x, y, blocks){
  var box = new Box(makeVector({x: x, y: y + (this.h - 2)}), this.w, 2 ).toPolygon(),
      test = newTest(box);

  var collisions = _.filter(blocks, test);

  return (collisions.length === 0) ? false : collisions;
};


Character.prototype.exit = function(exit){
  this.game.loadMap(exit.nextroom, exit.startpos);
};

function increaseByOne(dir, desired){
  switch (dir){
  case 'left':
    desired.x = desired.x - 1;
    break;
  case 'left back':
    desired.x = desired.x - 2;
    desired.y = desired.y - 1;
    break;
  case 'left front':
    desired.x = desired.x - 2;
    desired.y = desired.y + 1;
    break;
  case 'right':
    desired.x = desired.x + 1;
    break;
  case 'right back':
    desired.x = desired.x + 2;
    desired.y = desired.y - 1;
    break;
  case 'right front':
    desired.x = desired.x + 2;
    desired.y = desired.y + 1;
    break;
  case 'front':
    desired.y = desired.y + 1;
    break;
  case 'back':
    desired.y = desired.y - 1;
    break;
  }
  return desired;
}

Character.prototype.move = function(blocks){
  var diff = (this.ticker % 2 === 0) ? 24 : 16;

    switch(this.direction){
    case 'left':
      this.go('left', { x: this.x - diff, y: this.y }, blocks, diff);
      break;
    case 'left back':
      diff = diff / 2;
      this.go('left back', { x: this.x - (diff), y: this.y - (diff * 0.5) }, blocks, diff);
      break;
    case 'left front':
      diff = diff / 2;
      this.go('left front', { x: this.x - (diff), y: this.y + (diff * 0.5) }, blocks, diff);
      break;
    case 'front':
      this.go('front', { x: this.x, y: this.y + diff }, blocks, diff);
      break;
    case 'right':
      this.go('right', { x: this.x + diff, y: this.y }, blocks, diff);
      break;
    case 'right front':
      diff = diff / 2;
      this.go('right front', { x: this.x + (diff), y: this.y + (diff * 0.5) }, blocks, diff);
      break;
    case 'back':
      this.go('back', { x: this.x, y: this.y - diff }, blocks, diff);
      break;
    case 'right back':
      diff = diff / 2;
      this.go('right back', { x: this.x + (diff), y: this.y - (diff * 0.5) }, blocks, diff);
      break;
    }
};



Character.prototype.getSpriteState = function(){
  if(this.state === 'standing'){
    return this.sprite.standing[this.direction.split(' ')[0]];
  }
    return this.sprite.walking[this.direction.split(' ')[0]][this.ticker];
};

Character.prototype.maxy = function(){
  return this.y + this.h;
};

function newTest(box){
  return function(block){
    return testPolygonPolygon(box, block.box);
  };
}

module.exports = exports = Character;
