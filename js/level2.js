var block1 = {offset: {x:0, y: 0}, points: [
    {x: 315, y: 0},
    {x: 315, y: 248},
    {x: 0, y: 406},
    {x: 0, y:156}
]}, block2 = {offset: {x:0, y: 0}, points: [
    {x: 239, y: 287},
    {x: 238, y: 270},
    {x: 185, y: 321},
    {x: 195, y: 325},
    {x: 218, y: 315}
]}, block3 = {offset: {x:0, y: 0}, points: [
    {x: 325, y: 328},
    {x: 303, y: 348},
    {x: 303, y: 357},
    {x: 400, y: 309},
    {x: 400, y: 291}
]}, block4 = {offset: {x:0, y: 0}, points: [
    {x: 315, y: 0},
    {x: 315, y: 249},
    {x: 435, y: 309},
    {x: 435, y: 60}
]}, block5 = {offset: {x:0, y: 0}, points: [
    {x: 315, y: 0},
    {x: 401, y: 292},
    {x: 401, y: 309},
    {x: 435, y: 325}
]}, block6 = {offset: {x:0, y: 0}, points: [
    {x: 504, y: 94},
    {x: 434, y: 60},
    {x: 434, y: 326},
    {x: 504, y: 290}
]}, block7 = {offset: {x:0, y: 0}, points: [
    {x: 575, y: 315},
    {x: 505, y: 531},
    {x: 630, y: 414},
    {x: 630, y: 315}
]}, block8 = {offset: {x:0, y: 0}, points: [
    {x: 630, y: 323},
    {x: 223, y: 524},
    {x: 314, y: 570},
    {x: 630, y: 413}
]}, block9 = {offset: {x:0, y: 0}, points: [
    {x: 502, y: 350},
    {x: 630, y: 414},
    {x: 572, y: 314}
]}, block10 = {offset: {x:0, y: 0}, points: [
    {x: 0, y: 412},
    {x: 0, y: 570},
    {x: 316, y: 570}
]}, block11 = {offset: {x:0, y: 0}, points: [
    {x: 331, y: 295},
    {x: 331, y: 319},
    {x: 355, y: 319},
    {x: 355, y: 295}
]}, block12 = {offset: {x:0, y: 0}, points: [
    {x: 81, y: 396},
    {x: 60, y: 404},
    {x: 60, y: 414},
    {x: 81, y: 424},
    {x: 103, y: 413},
    {x: 103, y: 402}
]}, block13 = {offset: {x:0, y: 0}, points: [
    {x: 0, y: 414},
    {x: 194, y: 316},
    {x: 194, y: 300},
    {x: 0, y: 398}
]}, exit = {offset: {x:0, y: 0}, opts:{ blockType: 'exit', exit: {nextroom: 'Bedroom', startpos: {x:88, y: 384}}}, points: [
    {x: 504, y: 292},
    {x: 573, y: 316},
    {x: 569, y: 273}
]},
blocks = [block1, block2, block3, block4, block5, block6, block8, block9, block10, block11, block12, block13, exit];

var objs = [
    {image: 'assets/room-2-wall.gif', x: 442, y: 66, cutoff: 350},
    {image: 'assets/mic.gif', x: 331, y: 214, cutoff: 301},
    {image: 'assets/camera.gif', x: 58, y: 312, cutoff: 414},
    {image: 'assets/bleachers.gif', x: 224, y: 308, cutoff: 570}
];

var map = {name: 'TV Set', image: 'assets/room2.gif', w: 630, h: 570, objs: objs, blocks: blocks};

module.exports = exports = map;
