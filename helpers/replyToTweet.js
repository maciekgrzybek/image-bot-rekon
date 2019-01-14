/* eslint no-console: 0 */
const request = require('request-promise');
const { env } = require('./envSecrets');

const replyToTweet = async (status, tweetId) => {
  const requestOptions = {
    url: 'https://api.twitter.com/1.1/statuses/update.json?',
    oauth: env.credentials,
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

module.exports = { replyToTweet };
