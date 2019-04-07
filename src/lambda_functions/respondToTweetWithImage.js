const recognizeImage = require('../helpers/recognizeImage');
const removeImage = require('../helpers/removeImage');
const createMessage = require('../helpers/createMessage');
const TwitterController = require('../TwitterController');

module.exports.handler = async (event) => {
  const { s3 } = event.Records[0];
  const tweetId = s3.object.key.split('___---')[0];
  const username = s3.object.key.split('___---')[1];

  const labels = await recognizeImage(s3);
  const message = createMessage(username, labels);
  const controller = new TwitterController(
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    process.env.TWITTER_TOKEN,
    process.env.TWITTER_TOKEN_SECRET,
    process.env.URL_CREATE,
    process.env.ENVIRONMENT,
    process.env.CRC_URL,
  );
  await controller.createTweet(message, tweetId);
  removeImage(s3);
};
