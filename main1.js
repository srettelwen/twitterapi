const http = require('http')
const path = require('path')
const express = require('express')
const socketIo = require('socket.io')
const PORT = 3000

var Twitter = require('twitter');

var Twitter1 = require('twitter-js-client').Twitter;
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};
var config = {
    "consumerKey": "",
    "consumerSecret": "",
    "accessToken": "",
    "accessTokenSecret": ""
};

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
  client.get('statuses/home_timeline', function(error, tweets, response) {
       if(!error){
        console.log(tweets[0]);
        socket.emit('tweet',tweets[0]);
     }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

// var params = {screen_name: 's'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });




// var twitter1 = new Twitter1(config);
//
// twitter1.getHomeTimeline({ count: '1'}, function(error, tweets, success) {
//   if(!error){
//     console.log(tweets);
//   }
// });


server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
