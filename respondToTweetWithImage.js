const { replyToTweet } = require('./helpers/replyToTweet');
const { recognizeImage } = require('./helpers/recognizeImage');
const { removeImage } = require('./helpers/removeImage');
const { createMessage } = require('./helpers/createMessage');


module.exports.handler = async (event) => {
  console.log('something created on s3 new');
  const { s3 } = event.Records[0];
  const tweetId = s3.object.key.split('___')[0];
  const username = s3.object.key.split('___')[1];

  const labels = await recognizeImage(s3);
  const message = createMessage(username, labels);
  await replyToTweet(message, tweetId);
  removeImage(s3);
};
