function createImage(url){
  var img = new Image;
  img.src = url;
  return img;
}


Map = function(image, w, h, objs, blocks){
  this.initialize(image, w, h, objs, blocks);
}

Map.prototype.initialize = function(image, w, h, objs, blocks){
  this.width = w;
  this.height = h;
  this.image = createImage(image);
  this.objs = this.loadObjects(objs);
  this.blocks = this.makeBoxes(blocks);
}

Map.prototype.collision = function(box){
   return intersect(box, this.blocks);
};

Map.prototype.makeBoxes = function(blocks){
  return _.map(blocks, function(el){
    el.points = _.map(el.points, function(point){
      return new SAT.Vector(point.x, point.y);
    })
    el.box = new SAT.Polygon(new SAT.Vector(el.offset.x, el.offset.y), el.points);
    return el;
  }, this);
};

Map.prototype.loadObjects = function(objs){
  var Objs = _.map(objs, function(el){
    el.image = createImage(el.image);
    return el;
  }, this);
  return _.sortBy(Objs, function(el){return el.cutoff});
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

Game = function(map, character){
  var body = document.getElementsByTagName('body')[0],
      el = document.createElement('canvas');

      this.canvas = body.appendChild(el);

      this.canvas.setAttribute('id','canvas');
      this.canvas.setAttribute('width', map.width);
      this.canvas.setAttribute('height', map.height);
      this.targetFps = 10;
      this.ctx = canvas.getContext('2d');
      this.map = map;
      this.character = character;
      this.bindKeys();
      this.clearCanvas();
};


Game.prototype.clearCanvas = function(){
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function(){
    this.clearCanvas();
    this.character.tick(this.map.blocks);
    this.map.render(this.character, this.ctx);
};

Game.prototype.start = function(){
    var that = this;
    this.draw();
    window.setTimeout(function(){
      window.requestAnimationFrame(that.start.bind(that));
    }, 1000 / this.targetFps);
};

Game.prototype.bindKeys = function(){
  var character = this.character;
  var listener = new window.keypress.Listener();
      listener.register_many([{
        'keys':['left'],
        'on_keydown': function(e, c, r){
            character.direction = 'left';
            character.state = 'walking';
        },
        'on_keyup': function(){
          character.state = 'standing';
        },
        'is_exclusive': true

      },{
        'keys':['up'],
        'on_keydown': function(e, c, r){
          character.direction = 'back';
          character.state = 'walking';
        },
        'on_keyup': function(){
          character.state = 'standing';
        },
        'is_exclusive': true
      },{
        'keys':['down'],
        'on_keydown': function(e, c, r){
          character.direction = 'front';
          character.state = 'walking';
        },
        'on_keyup': function(){
          character.state = 'standing';
        },
        'is_exclusive': true
      },{
        'keys':['right'],
        'on_keydown': function(e, c, r){
          character.direction = 'right';
          character.state = 'walking';

        },
        'on_keyup': function(){
          character.state = 'standing';
        },
        'is_exclusive': true
      }]);
};

Character = function(name, sprite, x, y, w, h){
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

Sprite = function(address, w, h){
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
