const crypto = require('crypto');

module.exports = (crcToken, consumerSecret) => crypto.createHmac('sha256', consumerSecret).update(crcToken).digest('base64');;
