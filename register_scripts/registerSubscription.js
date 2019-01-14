/* eslint no-console: 0 */
const request = require('request-promise');
const { env } = require('../helpers/envSecrets.js');

module.exports.handler = async () => {
  const requestOptions = {
    url: `https://api.twitter.com/1.1/account_activity/all/${env.environment}/subscriptions.json`,
    oauth: env.credentials,
    resolveWithFullResponse: true,
  };

  try {
    const response = await request.post(requestOptions);
    if (response.statusCode === 204) {
      console.log('Subscription added. Yay!');
    }
  } catch (err) {
    console.log(err);
    console.log('Cannot register subscription');
  }
};
