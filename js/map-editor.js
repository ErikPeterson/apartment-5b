var map = require('./map.js');
var keypress = require('./keypress.js');
var createImage = require('./support.js').createImage;
var $ = document.querySelector.bind(document);

var MapEditor = function(){
    this.initialize();
};



MapEditor.prototype.initialize = function(){
    this.targetFps = 30;
    this.container = $('#editor-container');
    this.viewport = $('#editor-viewport');
    this.fields = $('#editor-fields');
    this.imageField = $('input#map-image');
    this.nameField = $('input#map-name');
    this.setButton = $('button#set-image');
    this.toolsContainer = $('#editor-tools');
    this.hide(this.toolsContainer);
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'canvas');
    this.viewport.appendChild(this.canvas);
    this.hide(this.canvas);
    this.hide(this.viewport);
    this.ctx = this.canvas.getContext('2d');
    this.bindEvents();
};

MapEditor.prototype.setDimensions = function (w, h){
    this.width = w;
    this.height = h;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
};

MapEditor.prototype.bindEvents = function(){
    var that = this;

    that.setButton.addEventListener('click', function (e){
        that.setBg();
    }, true);

    that.nameField.addEventListener('change', function(e){
        var name = that.nameField.value;
        that.name = name;
        console.log(that.name);
    });
};

MapEditor.prototype.setBg = function(){
    var val = this.imageField.value,
        reg =/^\s+$/;

    if(reg.test(val)){
        return;
    }

    this.img = createImage(val);

    this.img.addEventListener('load', function(e){
        this.show(this.viewport);
        this.show(this.canvas);
        this.setDimensions(this.img.width, this.img.height);
        this.start();
    }.bind(this), true);

    this.fields.removeChild(this.setButton);
    this.fields.removeChild(this.fields.querySelector('label:first-of-type'));
    this.show(this.toolsContainer);
};

MapEditor.prototype.hide = function(el){
    var classes = el.getAttribute('class') || '';
    if( !/\bhidden\b/.test(classes) ){
        if(classes !== ''){
            el.setAttribute('class', classes + ' hidden');
        } else{
            el.setAttribute('class', 'hidden');
        }
    }

};

MapEditor.prototype.show = function(el){
    var classes = el.getAttribute('class') || '';
    if( /\bhidden\b/.test(classes) ){
        el.setAttribute('class', classes.replace(/\s?hidden/, ''));
    }
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