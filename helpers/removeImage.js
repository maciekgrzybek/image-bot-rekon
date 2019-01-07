/* eslint no-console: 0 */
const AWS = require('aws-sdk');

const removeImage = async (meta) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: meta.bucket.name,
    Key: meta.object.key,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (err) {
    console.log(err);
    console.log('Cannot delete image.');
  }
};

module.exports = { removeImage };
