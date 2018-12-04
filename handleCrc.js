const { encodeCrc } = require('./helpers/encodeCrc');
const { auth } = require('./helpers/auth')

// const getCrcToken = ramda.path(['queryStringParameters', 'crc_token']);

module.exports.handler = async (event, context) => {

  const response_token = encodeCrc(event.queryStringParameters.crc_token, auth.credentials.consumer_secret);

  return {
    statusCode: 200,
    body: JSON.stringify({ response_token: `sha256=${response_token}` })
  }
};