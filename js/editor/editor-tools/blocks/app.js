var $ = _.bind(document.querySelector, document);

var BlockTools = function(editor){
    this.map = editor.map;
};

module.exports = exports = function(editor){
    return new BlockTools(editor);
};