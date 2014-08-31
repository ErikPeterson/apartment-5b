var bed = {image: 'assets/bed.gif', x: 295, y: 239, cutoff: 440},
    objs = [bed],
    wall1 = {offset: {x: 0, y: 0}, points: [{x: 315, y: 0}, {x: 0, y: 0}, {x:0,y: 414}, {x:315, y: 257}]},
    wall2 = {offset: {x: 0, y: 0}, points: [{x: 315, y: 0}, {x: 315, y: 257}, {x:630,y: 414}, {x:630, y: 0}]},
    wall3 = {offset: {x: 0, y: 0}, points: [{x: 0, y: 414}, {x: 12, y: 510}, {x: 104, y: 464}]},
    wall4 = {offset: {x: 0, y: 0}, points: [{x: 210, y: 517}, {x: 116, y: 564}, {x: 320, y: 570}]},
    wall5 = {offset: {x: 0, y: 0}, points: [{x: 310, y: 570}, {x: 630, y: 570}, {x: 630, y: 414}]},
    exit = {opts: { blockType: 'exit', exit: {nextroom: 'TV Set', startpos: {x: 448, y: 198}}}, offset: {x: 0, y: 0}, points: [{x: 12, y: 512}, {x: 0, y: 570}, {x: 116, y: 564}]},
    bedblock = {offset: {x: 0, y: 0}, points: [{x: 477, y: 346},{x:295,y:436},{x:430,y:502},{x:612,y:412}]},
    blocks = [wall1, wall2, wall3, wall4, wall5, bedblock, exit];


var map = {name:'Bedroom', image: 'assets/room1.gif', w: 630, h: 570, objs: objs, blocks: blocks};


module.exports = exports = map;