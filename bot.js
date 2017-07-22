const Twit = require('twit');
const config = require('./config.js');

var T = new Twit({

  consumer_key:         config.consumer_key,

  consumer_secret:      config.consumer_secret,

  access_token:         config.access_token,

  access_token_secret:  config.access_token_secret,

})


var stream = T.stream('statuses/filter', { track: 'issou' }),
	  tweetCount = 0;

stream.on('tweet', function (tweet) {
	if (tweetCount < 50) {
	T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
        if (err) {
        	console.log('Erreur lors du retweet : ' + err);
		} else {
		tweetCount++;
	        console.log('Tweet : ' + tweet.id_str + ' retweeté. Tweet count : ' + tweetCount);
        }
    });
    } else {
	    console.log('Rate limit atteinte : ' + tweetCount + ' tweets');
    }
});


setInterval(function() {
	tweetCount = 0;
}, 1800000);
    
