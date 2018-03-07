var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("client"));

app.get('/test', function(req, res){
	res.status(200).send('Todo bien por aca');
});

var messages = [{
	id: 1,
	text: 'bienvenido al chat, En que podemos ayudarte???',
	nickname: 'bot - Atencion al cliente'
}];

io.on('connection', function (socket) {
	console.log( socket.handshake.address+" esta conectado...");

	socket.emit('messages', messages);

	socket.on('add-message', function(data){
		messages.push(data);

		io.sockets.emit('messages', messages);
	});

});

server.listen(7070, function () {
	console.log('servidor en linea ingresa a http://localhost:7070');
});
