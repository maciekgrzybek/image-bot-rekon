const { encodeCrc } = require('./helpers/encodeCrc');
const { env } = require('./helpers/envSecrets');

module.exports.handler = async (event) => {
  const responseToken = encodeCrc(
    event.queryStringParameters.crc_token,
    env.credentials.consumer_secret,
  );
  return {
    statusCode: 200,
    body: JSON.stringify({ response_token: `sha256=${responseToken}` }),
  };
};
