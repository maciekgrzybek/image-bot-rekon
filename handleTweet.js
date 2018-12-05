/* eslint no-console: 0 */
const { replyToTweet } = require('./helpers/replyToTweet');


module.exports.handler = (event) => {
  const tweet = JSON.parse(event.body);
  const tweetEvents = tweet.tweet_create_events;
  if (typeof tweetEvents === 'undefined' || tweetEvents.length < 1) {
    console.log('Not a new tweet event');
    return;
  }

  if (tweet.for_user_id === tweetEvents[0].user.id_str) {
    console.log('Same user, not sending response.');
    return;
  }

  const { id_str, user } = tweet.tweet_create_events[0]; // eslint-disable-line

  replyToTweet(`Response to @${user.screen_name}. Hope it's ok now...`, id_str)
    .then(() => {
      console.log('Responded to tweet');
    })
    .catch((error) => {
      console.log(error);
    });
};
