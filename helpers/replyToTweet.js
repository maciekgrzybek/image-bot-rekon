const request = require('request-promise')
const { auth } = require('./auth')


// request options
const replyToTweet = (status, tweetId) => {

  const request_options = {
    url: 'https://api.twitter.com/1.1/statuses/update.json?',
    oauth: auth.credentials,
    form: {
      status,
      in_reply_to_status_id: tweetId,
      auto_populate_reply_metadata: true,
    },
    resolveWithFullResponse: true,
  }

  // POST request to create webhook config
  return new Promise((resolve, reject) => {

    request.post(request_options)
      .then((response) => {
        resolve(response);
        console.log(response)
      })
      .catch((response) => {
        reject(response);
      });
  });
};
module.exports = { replyToTweet };