const fs = require('fs');
const yaml = require('js-yaml');

const envSecrets = yaml.safeLoad(fs.readFileSync('../serverless.env.yml', 'utf8'));

const env = {
  credentials: {
    consumer_key: envSecrets.TWITTER_CONSUMER_KEY,
    consumer_secret: envSecrets.TWITTER_CONSUMER_SECRET,
    token: envSecrets.TWITTER_TOKEN,
    token_secret: envSecrets.TWITTER_TOKEN_SECRET,
  },
  crc_url: envSecrets.CRC_CHECK,
  environment: envSecrets.ENVIRONMENT,
};

module.exports = { env };
