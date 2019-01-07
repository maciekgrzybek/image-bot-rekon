const AWS = require('aws-sdk');

const recognizeImage = async (meta) => {
  const rekognition = new AWS.Rekognition();
  const params = {
    Image: {
      S3Object: {
        Bucket: meta.bucket.name,
        Name: meta.object.key,
      },
    },
    MaxLabels: 5,
    MinConfidence: 85,
  };

  try {
    const data = await rekognition.detectLabels(params).promise();
    return data.Labels;
  } catch (err) {
    console.log(err);
    console.log('Cannot recognize image');
  }
};

module.exports = { recognizeImage };
