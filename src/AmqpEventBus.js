'use strict'

const amqp = require('amqplib');
/**
 * adonis-amqp-eventbus
 *
 * (c) Jinggo Villamor <jcvillamor@multisyscorp.com>
 *
 */

/**
 * The Sophos class makes a request to a URL returning a promise
 * resolved with data or rejected with an error.
 *
 * @class AmqpEventBus
 *
 * @param {Object} Config
 */
class AmqpEventBus {
  username = 'admin';
  password = 'admin'
  host = 'localhost';

  constructor(Config) {
    this.config = Config.merge('eventbus', {
      username: this.username,
      password: this.password,
      host: this.host
    })

    this.url = `amqp://${this.config.username}:${this.config.password}@${this.config.host}`;
  }

  consume(q, worker) {
    amqp.connect(this.url).then((conn) => {
      process.once('SIGINT', () => conn.close());
      return conn.createChannel().then((ch) => {
        return ch.assertExchange(q).then(() => {
          return ch.consume(q, worker(ch), { noAck: false });
        })
      })
    }).catch(console.warn);
  }

  publish(q, msg, options, cb) {
    const opt = { deliveryMode: true, durable: true, ...options }

    if (!q) {
      throw "Queue was not set."
    }

    amqp.connect(this.url).then((conn) => {
      return conn.createChannel().then((ch) => {
        return ch.assertQueue(q, {durable: opt.durable }).then(() => {
          ch.sendToQueue(q, Buffer.from(msg), { deliveryMode: opt.deliveryMode });

          if (cb) cb(msg);

          return ch.close();
        })
      }).finally(() => conn.close())
    }).catch(console.warn);
  }
}

module.exports = AmqpEventBus;