(function(require){

    'use strict';

    var Game = require('./game.js');
    var map1 = require('./level1.js');
    var map2 = require('./level2.js');
    var $ = require('./support.js').querySelector(document);

    var kramer = {sprite: 'assets/kramer-sprite.gif', name:'Kramer', w: 64, h: 128};
    var container = $('#game');
    var canvas = container.appendChild(document.createElement('canvas'));
    
    container.appendChild(canvas);
    canvas.setAttribute('id', 'canvas');

    var g = new Game(canvas, kramer);

    g.registerMap(map1);
    g.registerMap(map2);

    g.loadMap('Bedroom', {x: 260, y: 250});

    g.launch();

}(require));