var Map = require('../models/map.js');
var keypress = require('../support/keypress.js');
var createImage = require('../support/functions.js').createImage;
var addClass = require('../support/functions.js').addClass;
var removeClass = require('../support/functions.js').removeClass;
var _ = require('lodash');
var $ = require('../support/functions.js').querySelector(document);


var MapEditor = function(canvas, ctx, bg){
    this.targetFps = 30;
    this.tools = {};
    this.canvas = canvas;
    console.log(canvas);
    this.ctx = ctx;
    this.imgs =[];
    this.imgs =[];
    this.events = {};
    this.setBg(bg);
};

MapEditor.prototype.on = function(eventname, fn, context){
    console.log(eventname, fn, context);
    if(!this.events[eventname]){
        this.events[eventname] = [];
    }

    if(context){    
        fn = fn.bind(context);
    } 
    
    this.events[eventname].push(fn);
};



MapEditor.prototype.emit = function(eventname, eventObj){
    if(this.events[eventname]){
        _.forEach(this.events[eventname], function(fn){
            fn(eventObj);
        });
    }
};

MapEditor.prototype.queueImage = function(img){
  this.imgs.push(img);
};

MapEditor.prototype.setDimensions = function (w, h){
    this.width = w;
    this.height = h;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.emit('dimensions-set', {w: w, h: h});
};


MapEditor.prototype.changeMapName = function(newname){
    this.name = newname;

    if(this.map){
        this.map.name = newname;
    }

};

MapEditor.prototype.activateToolset = function (toolset, button){
    var selector = '#' + toolset + '-palette',
        el = $(selector),
        prevButton = $('.tool.active'),
        prevEl = $('.tool-palette.active');

    if(prevButton){
        removeClass('active', prevButton);
    }

    if(prevEl){
        removeClass('active', prevEl);
    }
    
    addClass('active', button);
    addClass('active', el);
    
};

MapEditor.prototype.registerTool = function (name, fn){
    this.tools[name] = fn(this);
};

MapEditor.prototype.setBg = function(bg){
    this.img = bg;
    this.setDimensions(this.img.width, this.img.height);
   
    this.map = new Map ({
        h: this.width, 
        w: this.height,
        image: this.img
        },
        this.queueImage.bind(this)
        );

    this.start();
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
    this.map.render(this.ctx, 'editor');
};

module.exports = exports = MapEditor;