var static = require('node-static');

var fileServer = new static.Server('./app');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        if(request.url === '/'){
            fileServer.serveFile('/index.html', 200, {}, request, response);
        } else{
            fileServer.serve(request, response);
        }}).resume();

}).listen(80);