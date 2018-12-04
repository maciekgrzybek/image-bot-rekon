const request = require('request-promise');
const { auth } = require('../helpers/auth');

// request options
const requestOptions = {
  url: `https://api.twitter.com/1.1/account_activity/all/${auth.environment}/webhooks.json`,
  oauth: auth.credentials,
};

// POST request to create webhook config
request.get(requestOptions).then((response) => {
  console.log(response);
}).catch((response) => {
  console.log(response);
});
