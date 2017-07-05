var Twit = require('twit');
var config = require('./config.js');

var T = new Twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret,
})

var retweet = function () {
  var params = {
    q: 'issou',
  }

T.get('search/tweets', params, function(err, data) {
  if (!err) {
    var retweetId = data.statuses[0].id_str;
      T.post('statuses/retweet/:id', { id: retweetId }, function(err, response) {
        if (response) {
          console.log('Tweet retweeté');
        } else if (err) {
          console.log('Un bug est survenu lors du retweet.');
        }
      });
  } else {
    console.log('Un bug est survenu lors de la recherche.')
  }

});

}

retweet();

setInterval(retweet, 360000);
