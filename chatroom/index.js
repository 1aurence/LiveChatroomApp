let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('Connected to server');
});

io.on('connection', function(socket){
io.emit('connections',Object.keys(io.sockets.connected).length)
  socket.on('disconnect', function(){
    console.log('disconnected');
  });

socket.on('Created', (data) => {
  socket.broadcast.emit('Created', (data)) //broadcast data to others (io.emit emits to yourself as well)
})

socket.on('chat-message', (data) => {
  socket.broadcast.emit('chat-message', (data))
})
socket.on('typing', (data) => {
  socket.broadcast.emit('typing', (data))
})
socket.on('stopTyping', (data) => {
  socket.broadcast.emit('stopTyping', (data))
})
socket.on('Joined', (data) => {
  socket.broadcast.emit('Joined', (data))
})
socket.on('Leaved', (data) => {
  socket.broadcast.emit('Leaved', (data))
})

});
