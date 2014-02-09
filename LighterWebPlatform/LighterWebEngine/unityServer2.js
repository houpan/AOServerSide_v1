var net = require('net');
var ExBuffer = require('ExBuffer');
var ByteBuffer = require('ByteBuffer');

io.sockets.on('connection', function(socket) {
  console.log('client connected');
  socket.emit('message', 'Hello World!');
});