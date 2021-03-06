(function(require){
    
    'use strict';

    var Backbone = require('backbone');
    var $ = require('jquery');
    var _ = require('lodash');

    Backbone.$ = $;

    var MapEditor = require('../models/map-editor.js');

    var MapEditorView = Backbone.View.extend({
        tagName: 'div',
        id: 'editor-container',
        warning: _.template('<p class="modal-text warning"><%= text %></p><input type="button" id="close-modal"></input>'),
        events: {
            'click button#set-image': 'setImage',
            'change #map-name': 'setName',
            'click #close-modal': 'closeModal',
            'click #canvas': 'handleClick'
        },
        initialize: function(){
            this.render();
            return this;
        },
        render: function(){
            this.$modal = $('#modal-window');
            this.$canvas = $('<canvas />', {id:'canvas', Width: '1px', Height: '1px'});
            this.canvas = this.$canvas[0];
            this.$canvas.appendTo(this.$el.find('#editor-viewport'));
            this.ctx = this.canvas.getContext('2d');
            this.imagefield = $('#map-image');
            this.namefield = $('#map-name');

            return this;
        },
        setImage: function(){
            var val = this.imagefield.val(),
                regexp = /^\s+$/;

            if(regexp.test(val) || val === ''){
                this.renderModal(this.warning({text:'Bad image path, try again.'}));
                return;
            }

            this.imagefield.parents('fieldset').remove();
            
            var image = new Image();
            image.src = val;
            
            $(image).on('load', (function(){
                    this.mapEditor = new MapEditor(this.canvas, this.ctx, image);
                    this.$el.find('#editor-viewport').removeClass('hidden');
                }).bind(this));    
        },
        renderModal: function(html){
            this.$modal.find('#modal-container').html(html);
            this.$modal.removeClass('hidden');
        },
        closeModal: function(){
            this.$modal.addClass('hidden');
        },
        setMapName: function(){
            var name = this.namefield.val();
            this.MapEditor.changeMapName(name);
        },
        handleClick: function(e){
            var offset = $(this).offset(),
                xpos = e.clientX - offset.left,
                ypos = e.clientY - offset.top;

            if(!this.map || !this.map.currentTool){
                return;
            }

            this.map.currentTool(xpos, ypos);
        }
    });

module.exports = MapEditorView;
    
}(require));

