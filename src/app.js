var http = require('http');
var fs = require('fs');


// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./views/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket,pseudo) {

    socket.on('nouveau_client', function(pseudo) {
        socket.pseudo = pseudo;
    });

    socket.on('message_client', function (message) {
        socket.broadcast.emit('message_server',socket.pseudo+':'+message);
        socket.emit('message_server',socket.pseudo+':'+message);
    });	



});


server.listen(8080);