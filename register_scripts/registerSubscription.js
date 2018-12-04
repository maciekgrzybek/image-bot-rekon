const request = require('request-promise')
const { auth } = require('../helpers/auth.js')


// request options
var request_options = {
  url: `https://api.twitter.com/1.1/account_activity/all/${auth.environment}/subscriptions.json`,
  oauth: auth.credentials,
  resolveWithFullResponse: true
}

// POST request to create webhook config
request.post(request_options).then(function (response) {
  if (response.statusCode == 204) {
    console.log('Subscription added. Yay!')
  }
}).catch(function (response) {
  console.log(response.error)
})