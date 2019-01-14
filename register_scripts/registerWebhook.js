/* eslint no-console: 0 */
const request = require('request-promise');
const { env } = require('../helpers/envSecrets');

module.exports.handler = async () => {
  const requestOptions = {
    url: `https://api.twitter.com/1.1/account_activity/all/${env.environment}/webhooks.json`,
    oauth: env.credentials,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    form: {
      url: env.crc_url,
    },
  };

  try {
    const response = await request.post(requestOptions);
    console.log(response);
    console.log('Succesfully register webhook');
  } catch (err) {
    console.log(err);
    console.log('Cannot register webhhook');
  }
};
