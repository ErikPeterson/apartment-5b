var Character = require('./character.js');
var Map = require('./map.js');
var Game = require('./game.js');

var bed = {image: 'bed.gif', x: 295, y: 239, cutoff: 440},
    objs = [bed],
    wall1 = {offset: {x: 315, y: 0}, points: [{x: 0, y: 0}, {x: -315, y: 0}, {x:-315,y: 414}, {x:0, y: 257}]},
    wall2 = {offset: {x: 0, y: 0}, points: [{x: 315, y: 0}, {x: 315, y: 257}, {x:630,y: 414}, {x:630, y: 0}]},
    wall3 = {offset: {x: 0, y: 0}, points: [{x: 0, y: 414}, {x: 0, y: 570},{x: 315, y: 570}]},
    wall4 = {offset: {x: 0, y: 0}, points: [{x: 630, y: 414}, {x: 315, y: 570},{x: 630, y: 570}]}
    bedblock = {offset: {x: 0, y: 0}, points: [{x: 477, y: 346},{x:295,y:436},{x:430,y:502},{x:612,y:412}]};

var m = new Map('room1.gif', 630, 570, objs, [wall1, wall2, wall3, wall4, bedblock]);
var k = new Character('kramer', 'kramer-sprite.gif', 283, 250, 64, 128);
var g = new Game(m, k);

g.start();
