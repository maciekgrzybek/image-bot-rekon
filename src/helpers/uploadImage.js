/* eslint no-console: 0 */
const fetch = require('node-fetch');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports = async (image, meta) => {
  console.log('Uploading image....');

  const mediaResponse = await fetch(image);
  const bufferedMedia = await mediaResponse.buffer();
  const params = {
    Bucket: meta.bucket,
    Key: meta.key,
    Body: bufferedMedia,
  };

  try {
    const uploadedImage = await s3.putObject(params).promise();
    console.log(uploadedImage, 'Image uploaded.');
  } catch (err) {
    console.log(err);
    console.log('Cannot upload.');
  }
};
