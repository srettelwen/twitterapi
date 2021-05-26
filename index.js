var Twitter = require('twitter-js-client').Twitter;
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};
var config = {
    "consumerKey": process.env.consumerKey,
    "consumerSecret": process.env.consumerSecret,
    "accessToken": process.env.accessToken,
    "accessTokenSecret": process.env.accessTokenSecret
};
var twitter = new Twitter(config);
twitter.getHomeTimeline({ count: '100'}, error, success);
