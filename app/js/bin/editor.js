(function(require){
    var $ = require('jquery');
    var MapEditorView = require('../views/editor.js');

    $(function(){
        var me = new MapEditorView({el: $('#editor-container')});
    });

}(require));