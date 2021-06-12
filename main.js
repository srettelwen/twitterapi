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
  client.stream('statuses/filter', { follow: '1056278376628056064'}, function(stream) {
      stream.on('data', function(tweet) {
        if( tweet.in_reply_to_status_id || tweet.in_reply_to_status_id_str || tweet.in_reply_to_user_id || tweet.in_reply_to_user_id_str || tweet.in_reply_to_screen_name )
        {
          console.log("No");
        }
        else if( tweet.retweeted_status && tweet.user.name != "NDTV" ){
          console.log("No");
        }
        else if( tweet.retweeted_status && tweet.user.name == "NDTV" ){
          console.log("got the following twitter message: " + JSON.stringify(tweet));
          console.log("Yes");
          socket.emit('tweet',tweet);
        }
        else{
          console.log("got the following twitter message: " + JSON.stringify(tweet));
          console.log("Total Yes");
          socket.emit('tweet',tweet);
        }
      });

      stream.on('error', function(error) {
        console.log("Could not get any twitter feeds");
      });
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index2.html'))
})



server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
