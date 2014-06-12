var keypress = require('./keypress');

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
