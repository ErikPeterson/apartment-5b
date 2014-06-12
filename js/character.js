var Sprite = require('./sprite');
var SAT = require('./SAT.min.js');
var _ = require('lodash');
var exports;

var Character = function(name, sprite, x, y, w, h){
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.sprite = new Sprite(sprite, w, h);
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
    this.move(blocks)
  }
  return (this.ticker === 3 ? this.ticker = 0 : this.ticker++);
};


Character.prototype.move = function(blocks){
  var newpos,
      box,
      collisions,
      diff = (this.ticker % 2 === 0) ? 8: 16;

    switch(this.direction){
    case 'left':
          newpos = { x: this.x - diff, y: this.y };
          box = new SAT.Box(new SAT.Vector(newpos.x, newpos.y + (this.h - 2)), this.w, 2).toPolygon();

          collisions = _.filter(blocks, function(block){
            return SAT.testPolygonPolygon(box, block.box);
          });

          while(collisions.length > 0){
            newpos.x = newpos.x + 1;
            box = new SAT.Box(new SAT.Vector(newpos.x, newpos.y + this.h - 2), this.w, 2).toPolygon();
            collisions = _.filter(collisions, function(block){
              return SAT.testPolygonPolygon(box, block.box);
            });
          }
      break;
    case 'front':
      newpos = { x: this.x, y: this.y + diff };
      box = new SAT.Box(new SAT.Vector(newpos.x, newpos.y + this.h - 2), this.w, 2).toPolygon();

      collisions = _.filter(blocks, function(block){
        return SAT.testPolygonPolygon(box, block.box);
      });

      while(collisions.length > 0){
        newpos.y = newpos.y - 1;
        box = new SAT.Box(new SAT.Vector(newpos.x, newpos.y + this.h - 2), this.w, 2).toPolygon();
        collisions = _.filter(collisions, function(block){
          return SAT.testPolygonPolygon(box, block.box);
        });
      }
      break;
    case 'right':
      newpos = { x: this.x + diff, y: this.y };
      box = new SAT.Box(new SAT.Vector(newpos.x, newpos.y + this.h - 2), this.w, 2).toPolygon();

      collisions = _.filter(blocks, function(block){
        return SAT.testPolygonPolygon(box, block.box);
      });

      while(collisions.length > 0){
        newpos.x = newpos.x - 1;
        box = new SAT.Box(new SAT.Vector(newpos.x, newpos.y + this.h - 2), this.w, 2).toPolygon();
        collisions = _.filter(collisions, function(block){
          return SAT.testPolygonPolygon(box, block.box);
        });
      }
      break;
    case 'back':
      newpos = { x: this.x, y: this.y - diff };
      box = new SAT.Box(new SAT.Vector(newpos.x, newpos.y + this.h - 2), this.w, 2).toPolygon();

      collisions = _.filter(blocks, function(block){
        return SAT.testPolygonPolygon(box, block.box);
      });

      while(collisions.length > 0){
        newpos.y = newpos.y + 1;
        box = new SAT.Box(new SAT.Vector(newpos.x, newpos.y + this.h - 2), this.w, 2).toPolygon();
        collisions = _.filter(collisions, function(block){
          return SAT.testPolygonPolygon(box, block.box);
        });
      }
      break;
    }
    this.x = newpos.x;
    this.y = newpos.y;
};



Character.prototype.getSpriteState = function(){
  if(this.state === 'standing'){
    return this.sprite.standing[this.direction]
  }
    return this.sprite.walking[this.direction][this.ticker];
};

Character.prototype.maxy = function(){
  return this.y + this.h;
};

module.exports = exports = Character;
