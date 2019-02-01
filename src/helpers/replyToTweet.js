/* eslint no-console: 0 */
const request = require('request-promise');

module.exports = async (status, tweetId) => {
  const requestOptions = {
    url: 'https://api.twitter.com/1.1/statuses/update.json?',
    oauth: {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      token: process.env.TWITTER_TOKEN,
      token_secret: process.env.TWITTER_TOKEN_SECRET,
    },
    form: {
      status,
      in_reply_to_status_id: tweetId,
      auto_populate_reply_metadata: true,
    },
    headers: {
      Connection: 'Keep-Alive',
    },
    resolveWithFullResponse: true,
  };

  try {
    await request.post(requestOptions);
  } catch (err) {
    console.log(err);
    console.log('Cannot post tweet.');
  }
};
