/* eslint no-console: 0 */
const request = require('request-promise');
const { env } = require('../helpers/envSecrets');

const getWebhook = async () => {
  const requestOptions = {
    url: `https://api.twitter.com/1.1/account_activity/all/${env.environment}/webhooks.json`,
    oauth: env.credentials,
  };

  try {
    return await request.get(requestOptions);
  } catch (err) {
    console.log('Cannot get webhook');
    console.log(err);
  }
};

module.exports = { getWebhook };
