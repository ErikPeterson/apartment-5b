(function(require){

    'use strict';

    var _ = require('lodash');
    var Backbone = require('backbone');
    var $        = require('jquery');
        Backbone.$ = $;

    var Game = require('../models/game.js');
    var Map1 = require('../data/levels/level1.js');
    var Map2 = require('../data/levels/level2.js');

    var GameView = Backbone.View.extend({
        selector: '#canvas',
        tagName: 'canvas',
        $parent: $('#game'),
        initialize: function(){
            console.log('butt');
            this.render();
            return this;
        },
        render: function(){
            if(!this.game){
                return this.initRender();
            }

            return this;
        },
        initRender: function(){
            var kramer = {sprite: 'assets/kramer-sprite.gif', name:'Kramer', w: 64, h: 128};
            
            this.$parent.append(this.$el);
            this.game = new Game(this.el, kramer);
            this.game.registerMap(Map1);
            this.game.registerMap(Map2);
            this.game.loadMap('Bedroom', {x: 260, y: 250});
            this.game.launch();

            return this;
        }
    });

    module.exports = GameView;

}(require));