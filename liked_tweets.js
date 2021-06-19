const http = require('http')
const path = require('path')
const express = require('express')
const socketIo = require('socket.io')
const PORT = 3000

var Twitter = require('twitter');


var client = new Twitter({
      consumer_key: '',
      consumer_secret: '',
      access_token_key: '',
      access_token_secret: ''
    });



const app = express();

const server = http.createServer(app);
const io = socketIo(server);


io.on('connection', (socket) => {
  console.log('Client connected...')
  client.get('favorites/list', function(error, tweets, response) {
    if(error) throw error;
    console.log(tweets);  // The favorites.
    console.log(response);  // Raw response object.
    socket.emit('tweet',tweets);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})



server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
