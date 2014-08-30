var keypress = require('./keypress');
var Character = require('./character');
var _ = require('lodash');
var Map = require('./map');


Game = function(element, character, mode){
  this.initialize(element, character, mode);
};

Game.prototype.initialize = function(canvas, character, mode){
  this.mode = mode;
  this.imgs = [];
  this.canvas = canvas;
  this.targetFps = 10;
  this.loading = 0;
  this.ctx = this.canvas.getContext('2d');
  this.ctx.imageSmoothingEnabled=false;
  this.character = new Character(character, this.queueImage.bind(this));
  this.character.game = this;
  this.bindKeys();
  this.addListeners();
};

Game.prototype.queueImage = function(img){
  this.imgs.push(img);
};

Game.prototype.imagesLoaded = function(){
  return _.every(this.imgs, 'complete');
};

Game.prototype.addListeners = function(){
  window.addEventListener('resize', (function(e){
    this.reposition();
  }).bind(this), true);
  window.addEventListener('onblur', (function(e){
    this.stop();
  }).bind(this), true);

  window.addEventListener('onfocus', (function focusIn(e){
        this.launch();
  }).bind(this), true);
};

Game.prototype.registerMap = function(map){
  var curmap = new Map(map, this.queueImage.bind(this));
  this.maps = this.maps || {};
  this.maps[curmap.name] = curmap;
};

Game.prototype.loadMap = function (name, startpos){
  this.clearCanvas();
  this.map = this.maps[name];
  this.canvas.setAttribute('width', this.map.width);
  this.canvas.setAttribute('height', this.map.height);
  this.character.x = startpos.x;
  this.character.y = startpos.y;
  this.reposition();
};

Game.prototype.reposition = function(){
  var cwidth = window.innerWidth,
      cheight = window.innerHeight,
      offset = {x: 0, y: 0};

    if(this.map.width <= cwidth){
      offset.x = (cwidth - this.map.width) / 2;
    } else{
      offset.x = -1 * (this.character.x - (cwidth / 2));
    }
    if(this.map.height <= cheight){
      offset.y = (cheight - this.map.height) /2;
    } else{
      offset.y = -1 * (this.character.y - (cheight / 2));
    }

  this.canvas.style.left = offset.x + 'px';
  this.canvas.style.top = offset.y + 'px';
};


Game.prototype.clearCanvas = function(){
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function(){
    this.clearCanvas();
    this.character.tick(this.map.blocks);
    this.map.render(this.ctx, this.mode, this.character);
    if(this.map.width > window.outerWidth || this.map.height > window.outerHeight){
      this.reposition();
    }
};

Game.prototype.launch = function(){
  if(this.imagesLoaded()){
    this.start();
  } else{
    window.setTimeout((function(){
      this.launch();
    }).bind(this), 125);
  }
};

Game.prototype.start = function(ts){
  var that = this;
      that.draw();
      that.running = true;
      that.timer = window.setTimeout(function(){
        window.requestAnimationFrame(that.start.bind(that));
      }, 1000 / that.targetFps);  
};

Game.prototype.stop = function(){
    window.clearTimeout(this.timer);
    this.running = false;
};

Game.prototype.bindKeys = function(){
  var character = this.character;
  var listener = new keypress.Listener();
      listener.register_many([{
        'keys':'left',
        'on_keydown': function(e, c, r){
            character.direction = 'left';
            character.state = 'walking';
        },
        'on_keyup': function(){
          character.state = 'standing';
        },
        is_solitary: true
      },{
        'keys':'up',
        'on_keydown': function(e, c, r){
          character.direction = 'back';
          character.state = 'walking';
        },
        'on_keyup': function(){
          character.state = 'standing';
        },
        is_solitary: true
      },{
        'keys':['down'],
        'on_keydown': function(e, c, r){
          character.direction = 'front';
          character.state = 'walking';
        },
        'on_keyup': function(){
          character.state = 'standing';
        },
        is_solitary: true
      },{
        'keys':['right'],
        'on_keydown': function(e, c, r){
          character.direction = 'right';
          character.state = 'walking';

        },
        'on_keyup': function(){
          character.state = 'standing';
        }
      },{
        'keys':'left up',
        'on_keydown': function(e, c, r){
            character.direction = 'left back';
            character.state = 'walking';
        },
        'on_keyup': function(){
          character.state = 'standing';
        },
        is_unordered: true
      },{'keys':'left down',
        'on_keydown': function(e, c, r){
            character.direction = 'left front';
            character.state = 'walking';
        },
        'on_keyup': function(){
          character.state = 'standing';
        },
        is_unordered: true
      },{'keys':'right up',
        'on_keydown': function(e, c, r){
            character.direction = 'right back';
            character.state = 'walking';
        },
        'on_keyup': function(){
          character.state = 'standing';
        },
        is_unordered: true
      },{'keys':'right down',
        'on_keydown': function(e, c, r){
            character.direction = 'right front';
            character.state = 'walking';
        },
        'on_keyup': function(){
          character.state = 'standing';
        },
        is_unordered: true
      }]);
};

module.exports = exports = Game;
