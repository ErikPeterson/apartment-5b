var makeVector = require('./support.js').makeVector;
var _ = require('lodash');
var SAT = require('./SAT.min.js');
var Polygon = SAT.Polygon;

var defaults = {
    type: 'block'
};


var Block = function(offset, points, opts){
    var obj = _.defaults(opts, defaults),
        origin = makeVector(offset),
        vectors = _.map(points, makeVector, this);

        this.box = new Polygon(origin, vectors);
};

Block.make = function(hash){
    return new Block(hash.offset, hash.points, hash.options);
};

Block.makeGroup = function(arr){
    return _.map(arr, Block.make);
};

module.exports = exports = Block;