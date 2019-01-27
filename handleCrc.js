const encodeCrc = require('./helpers/encodeCrc');

module.exports.handler = async (event) => {
  const responseToken = encodeCrc(
    event.queryStringParameters.crc_token,
    process.env.TWITTER_CONSUMER_SECRET,
  );
  return {
    statusCode: 200,
    body: JSON.stringify({ response_token: `sha256=${responseToken}` }),
  };
};
