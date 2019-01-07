/* eslint no-console: 0 */
const { uploadImage } = require('./helpers/uploadImage');
const { createMessage } = require('./helpers/createMessage');
const { replyToTweet } = require('./helpers/replyToTweet');

module.exports.handler = async (event) => {
  const tweet = JSON.parse(event.body);
  const tweetData = await tweet.tweet_create_events;

  if (typeof tweetData === 'undefined' || tweetData.length < 1) {
    console.log('Not a new tweet event');
    return;
  }

  if (tweet.for_user_id === tweetData[0].user.id_str) {
    console.log('Same user, not sending response.');
    return;
  }

  const { id_str, user, entities } = tweetData[0]; // eslint-disable-line
  const key = `${id_str}___---${user.screen_name}`; // eslint-disable-line

  // If tweet containes image
  if (entities.hasOwnProperty('media')) { // eslint-disable-line
    console.log('foto jest - handleTweet');
    const imageUrl = tweetData[0].entities.media[0].media_url_https;
    await uploadImage(imageUrl, {
      bucket: process.env.BUCKET,
      key,
    });
  } else {
    console.log('no photo?')
    const message = createMessage(user.screen_name);
    await replyToTweet(message, key);
  }
};
