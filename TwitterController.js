/* eslint no-console: 0 */
const request = require('request-promise');

module.exports = class TwitterController {
  constructor(consumerKey, consumerSecret, token, tokenSecret, urlBase, environment, crcUrl) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.token = token;
    this.tokenSecret = tokenSecret;
    this.urlBase = urlBase;
    this.environment = environment;
    this.crcUrl = crcUrl;
    this.credentials = {
      consumer_key: this.consumerKey,
      consumer_secret: this.consumerSecret,
      token: this.token,
      token_secret: this.tokenSecret,
    };

    this.registerWebhook = this.registerWebhook.bind(this);
  }

  setRequestOptions(type, webhhokId) {
    let path = null;
    let content = {};
    const { urlBase, environment, credentials, crcUrl } = this;

    switch (type) {
      case ('registerWebhook'):
        path = 'webhooks';
        content = {
          form: {
            url: crcUrl,
          },
        };
        break;
      case ('getWebhook'):
        path = 'webhooks';
        break;
      case ('deleteWebhook'):
        path = `webhooks/${webhhokId}`;
        break;
      case ('registerSubscription'):
        path = 'subscriptions';
        break;
      default:
        path = 'webhhoks';
    }
    return Object.assign({}, {
      url: `${urlBase}${environment}/${path}.json`,
      oauth: credentials,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      resolveWithFullResponse: true,
    }, content);
  }

  async registerWebhook() {
    const requestOptions = this.setRequestOptions('registerWebhook');

    try {
      const response = await request.post(requestOptions);
      console.log(response);
      console.log('Succesfully register webhook');
    } catch (err) {
      console.log(err);
      console.log('Cannot register webhook');
    }
  }

  async registerSubscription() {
    const requestOptions = this.setRequestOptions('registerSubscription');

    try {
      const response = await request.post(requestOptions);
      if (response.statusCode === 204) {
        console.log('Subscription added. Yay!');
      }
    } catch (err) {
      console.log(err);
      console.log('Cannot register subscription');
    }
  }

  async getWebhook() {
    const requestOptions = this.setRequestOptions('getWebhook');

    try {
      return await request.get(requestOptions);
    } catch (err) {
      console.log('Cannot get webhook');
      console.log(err);
    }
  }

  async deleteWebhook() {
    const webhook = await this.getWebhook();
    const parsedWebhook = JSON.parse(webhook.body);
    const requestOptions = this.setRequestOptions('deleteWebhook', parsedWebhook[0].id);

    try {
      const response = await request.delete(requestOptions);
      console.log(response);
      console.log(`Deleted webhook with id: ${parsedWebhook[0].id}`);
    } catch (err) {
      console.log('Cannot delete webhook');
      console.log(err);
    }
  }
};