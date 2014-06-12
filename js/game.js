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
};

Game.prototype.loadMap = function (map, startpos){
  this.clearCanvas();
  this.map = new Map(map);
  this.canvas.setAttribute('width', this.map.width);
  this.canvas.setAttribute('height', this.map.height);
  this.character.x = startpos.x;
  this.character.y = startpos.y;
  this.bindKeys();
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
