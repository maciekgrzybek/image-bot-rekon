/* eslint no-console: 0 */
const request = require('request-promise');
const { getWebhook } = require('./getWebhook');
const { env } = require('../helpers/envSecrets');

module.exports.handler = async () => {
  const webhook = await getWebhook();
  const parsedWebhook = JSON.parse(webhook);
  const requestOptions = {
    url: `https://api.twitter.com/1.1/account_activity/all/${env.environment}/webhooks/${parsedWebhook[0].id}.json`,
    oauth: env.credentials,
    resolveWithFullResponse: true,
  };

  try {
    const resp = await request.delete(requestOptions);
    console.log(resp);
    console.log(`Deteletd webhook with id: ${parsedWebhook[0].id}`);
  } catch (err) {
    console.log('Cannot delete webhook');
    console.log(err);
  }
};
