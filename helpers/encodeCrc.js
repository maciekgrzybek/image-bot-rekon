const crypto = require('crypto');

const encodeCrc = (crcToken, consumerSecret) => {
  let token = crypto.createHmac('sha256', consumerSecret).update(crcToken).digest('base64');

  return token;
}

module.exports = { encodeCrc }