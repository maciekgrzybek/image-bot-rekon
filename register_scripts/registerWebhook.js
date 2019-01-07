const request = require('request-promise');
const { auth } = require('../helpers/auth');

// request options
const requestOptions = {
  url: `https://api.twitter.com/1.1/account_activity/all/${auth.environment}/webhooks.json`,
  oauth: auth.credentials,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
  },
  form: {
    url: auth.crc_url,
  },
};

// POST request to create webhook config
request.post(requestOptions).then((response) => {
  console.log(response);
}).catch((response) => {
  console.log(response);
});
