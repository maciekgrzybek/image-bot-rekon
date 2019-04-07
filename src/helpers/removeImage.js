/* eslint no-console: 0 */
const AWS = require('aws-sdk');

module.exports = (meta) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: meta.bucket.name,
    Key: meta.object.key,
  };

  try {
    s3.deleteObject(params).promise();
  } catch (err) {
    console.log(err);
    console.log('Cannot delete image.');
  }
};
