var keypress = require('./keypress');
var Character = require('./character');
var Map = require('./map');

Game = function(element, character){
  this.initialize(element, character);
};

Game.prototype.initialize = function(element, character){
  this.container = document.getElementById(element);
  this.canvas = this.container.appendChild(document.createElement('canvas'));
  this.canvas.setAttribute('id','canvas');
  this.targetFps = 10;
  this.ctx = canvas.getContext('2d');
  this.character = new Character(character);
  this.character.game = this;
  window.addEventListener('resize', (function(e){
    this.reposition();
  }).bind(this), true);
};

Game.prototype.loadMap = function (map, startpos){
  this.clearCanvas();
  this.map = new Map(map);
  this.canvas.setAttribute('width', this.map.width);
  this.canvas.setAttribute('height', this.map.height);
  this.character.x = startpos.x;
  this.character.y = startpos.y;
  this.bindKeys();
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
    this.map.render(this.character, this.ctx);
    if(this.map.width > window.outerWidth || this.map.height > window.outerHeight){
      this.reposition();
    }
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
  var listener = new keypress.Listener();
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

module.exports = exports = Game;
