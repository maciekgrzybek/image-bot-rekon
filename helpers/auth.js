const fs = require('fs');
const yaml = require('js-yaml');

const env = yaml.safeLoad(fs.readFileSync('serverless.env.yml', 'utf8'));

const auth = {
  credentials: {
    consumer_key: env.twitter.TWITTER_CONSUMER_KEY,
    consumer_secret: env.twitter.TWITTER_CONSUMER_SECRET,
    token: env.twitter.TWITTER_TOKEN,
    token_secret: env.twitter.TWITTER_TOKEN_SECRET,
  },
  crc_url: env.twitter.CRC_CHECK,
  environment: env.twitter.ENVIRONMENT,
  webhook_id: env.twitter.WEBHOOK_ID,
}

module.exports = { auth };