
const TwitterController = require('../TwitterController');

module.exports.handler = async () => {

  const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_TOKEN, TWITTER_TOKEN_SECRET, URL_BASE, ENVIRONMENT, CRC_URL } = process.env;
  const controller = new TwitterController(
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_TOKEN,
    TWITTER_TOKEN_SECRET,
    URL_BASE,
    ENVIRONMENT,
    CRC_URL,
  );

  await controller.registerSubscription();
};
