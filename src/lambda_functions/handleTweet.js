/* eslint no-console: 0 */
const uploadImage = require('../helpers/uploadImage');
const createMessage = require('../helpers/createMessage');
const TwitterController = require('../TwitterController');

module.exports.handler = async (event) => {
  const tweet = JSON.parse(event.body);
  const tweetData = await tweet.tweet_create_events;

  if (typeof tweetData === 'undefined' || tweetData.length < 1) {
    return console.log('Not a new tweet event');
  }

  if (tweet.for_user_id === tweetData[0].user.id_str) {
    return console.log('Same user, not sending response.');
  }

  const { id_str, user, entities } = tweetData[0];
  const key = `${id_str}___---${user.screen_name}`;

  // If tweet containes image
  if (entities.hasOwnProperty('media')) {
    const imageUrl = tweetData[0].entities.media[0].media_url_https;
    await uploadImage(imageUrl, {
      bucket: process.env.BUCKET,
      key,
    });
  } else {
    const controller = new TwitterController(
      process.env.TWITTER_CONSUMER_KEY,
      process.env.TWITTER_CONSUMER_SECRET,
      process.env.TWITTER_TOKEN,
      process.env.TWITTER_TOKEN_SECRET,
      process.env.URL_CREATE,
      process.env.ENVIRONMENT,
      process.env.CRC_URL,
    );
    const message = createMessage(user.screen_name);
    await controller.createTweet(message, key);
  }
};
