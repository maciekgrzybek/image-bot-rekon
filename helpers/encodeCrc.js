const crypto = require('crypto');

const encodeCrc = (crcToken, consumerSecret) => crypto.createHmac('sha256', consumerSecret).update(crcToken).digest('base64');

module.exports = { encodeCrc };
