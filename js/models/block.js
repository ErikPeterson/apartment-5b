var makeVector = require('../support/functions.js').makeVector;
var _ = require('lodash');
var SAT = require('../support/SAT.min.js');
var Polygon = SAT.Polygon;

var defaults = {
    type: 'block'
};


var Block = function(offset, points, opts){
    var obj = _.defaults(opts, defaults),
        origin = makeVector(offset),
        vectors = _.map(points, makeVector, this);

        this.opts = opts || {};
        this.offset = offset;
        this.points = points;
        this.box = new Polygon(origin, vectors);
        this.blockType = this.opts.blockType || 'block';

        if(this.blockType === 'exit'){
            this.exit = _.clone(this.opts.exit, true);
        }
};

Block.make = function(hash){
    return new Block(hash.offset, hash.points, hash.opts);
};

Block.prototype.toHash = function(){
    return {offset: this.offset, points: this.points, opts: this.opts};
};

Block.makeGroup = function(arr){
    return _.map(arr, Block.make);
};

module.exports = exports = Block;