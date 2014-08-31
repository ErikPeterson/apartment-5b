(function(require){
    
    'use strict';

    var Backbone = require('backbone');
    var $ = require('jquery');
    var _ = require('lodash');

    Backbone.$ = $;

    var MapEditor = require('../editor/map-editor.js');

    var MapEditorView = Backbone.View.extend({
        tagName: 'div',
        id: 'editor-container',
        warning: _.template('<p class="modal-text warning"><%= text %></p><input type="button" id="close-modal"></input>'),
        events: {
            'click button#set-image': 'setImage',
            'change #map-name': 'setName',
            'click #close-modal': 'closeModal'
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

            console.log('butt');

            if(regexp.test(val) || val === ''){
                this.renderModal(this.warning({text:'Bad image path, try again.'}));
                return;
            }

            this.imagefield.parent('fieldset').remove();
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
            console.log('butt');
            this.MapEditor.changeMapName(name);
        }
    });
$(function(){
    var me = new MapEditorView({el: $('#editor-container')});

    me.on('all', function(eventName){
    console.log('Name of View: ' + eventName);
});

});
    
}(require));

