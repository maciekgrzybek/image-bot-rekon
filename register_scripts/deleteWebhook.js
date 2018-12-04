const request = require('request-promise');
const { auth } = require('../helpers/auth');

// request options
const requestOptions = {
  url: `https://api.twitter.com/1.1/account_activity/all/${auth.environment}/webhooks/${auth.webhook_id}.json`,
  oauth: auth.credentials,
  resolveWithFullResponse: true,
};

// Remove Webhook id
request.delete(requestOptions)
  .then(() => {
    console.log('Webhook deleted');
  })
  .catch((response) => {
    console.log(response);
  });
