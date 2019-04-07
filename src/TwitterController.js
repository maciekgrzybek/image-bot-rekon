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
    let url = null;
    let content = {};
    const { urlBase, environment, credentials, crcUrl } = this;

    switch (type) {
      case ('registerWebhook'):
        url = `${urlBase}${environment}/webhooks.json`;
        content = {
          form: {
            url: crcUrl,
          },
        };
        break;
      case ('getWebhook'):
        url = `${urlBase}${environment}/webhooks.json`;
        break;
      case ('deleteWebhook'):
        url = `${urlBase}${environment}/webhooks/${webhhokId}.json`;
        break;
      case ('registerSubscription'):
        url = `${urlBase}${environment}/subscriptions.json`;
        break;
      case ('createTweet'):
        url = `${urlBase}update.json`;
        break;
      default:
        url = `${urlBase}${environment}/webhooks.json`;
    }
    return Object.assign({}, {
      url,
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

  async createTweet(status, tweetID) {
    const requestOptions = Object.assign({}, this.setRequestOptions('createTweet'), {
      form: {
        status,
        in_reply_to_status_id: tweetID,
        auto_populate_reply_metadata: true,
      },
    });

    try {
      await request.post(requestOptions);
    } catch (err) {
      console.log(err);
      console.log('Cannot post tweet.');
    }
  }
};
