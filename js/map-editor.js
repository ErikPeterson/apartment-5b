var map = require('./map.js');
var keypress = require('./keypress.js');
var createImage = require('./createImage.js');

var MapEditor = function(){
    this.initialize();
};

MapEditor.prototype.initialize = function(){
    this.targetFps = 30;
    this.height = 570;
    this.width = 630;
    this.container = document.querySelector('#editor-container');
    this.viewport = document.querySelector('#editor-viewport');
    this.fields = document.querySelector('#editor-fields');
    this.widthField = document.querySelector('input#map-width');
    this.heightField = document.querySelector('input#map-height');
    this.imageField = document.querySelector('input#map-image');
    this.setButton = document.querySelector('button#set-image');
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.canvas.setAttribute('height', this.height);
    this.canvas.setAttribute('width', this.width);
    this.viewport.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.bindEvents();
};

MapEditor.prototype.bindEvents = function(){
    this.keyhandler = new keypress.Listener();
    var that = this;

    that.setButton.addEventListener('click', function (e){
        that.setBg();
    }, true);
};

MapEditor.prototype.setBg = function(){
    var val = this.imageField.value,
        reg =/^\s+$/;

    if(reg.test(val)){
        return;
    }

    this.img = createImage(val);
    this.img.addEventListener('load', this.start.bind(this), true);
    this.fields.removeChild(this.fields.querySelector('label:last-of-type'));
    this.fields.removeChild(this.setButton);
};

MapEditor.prototype.start = function(e){
    var that = this;
      that.draw();
      that.timer = window.setTimeout(function(){
        window.requestAnimationFrame(that.start.bind(that));
      }, 1000 / that.targetFps); 
};

MapEditor.prototype.clearCanvas = function(){
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
};

MapEditor.prototype.draw = function(){
    this.clearCanvas();
    this.ctx.drawImage(this.img, 0, 0);
};

module.exports = exports = MapEditor;