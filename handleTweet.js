const { replyToTweet } = require('./helpers/replyToTweet');


module.exports.handler = (event, context) => {

  const tweet = JSON.parse(event.body);


  const tweetEvents = tweet.tweet_create_events;
  if (typeof tweetEvents === 'undefined' || tweetEvents.length < 1) {
    console.log('Not a new tweet event');
    return;
  }

  const { id_str, user } = tweet.tweet_create_events[0];
  console.log(context);

  replyToTweet(`Response to @${user.screen_name}. Hope it's ok now...`, id_str)
    .then((response) => {
      console.log(response);

      return {
        statusCode: 200,
        body: JSON.stringify({ respondedToTweet: true }),
      };
    })
    .catch((error) => {
      console.log(error);

      return {
        statusCode: 400,
        body: JSON.stringify({ respondedToTweet: false }),
      };
    });

}