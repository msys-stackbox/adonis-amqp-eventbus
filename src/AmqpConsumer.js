'use strict'

const amqp = require('amqplib');

const AmqpEventBusService = require('./AmqpEventBusService');
/**
 * adonis-amqp-eventbus
 *
 * (c) Jinggo Villamor <jcvillamor@multisyscorp.com>
 *
 */
class AmqpConsumer extends AmqpEventBusService {

  constructor(Config) {
    super(Config, 'Consumer');
  }

  async consume(queue, worker) {

    this._connection.then(channel => {
      return channel.assertQueue(queue).then(() => {

        return channel.consume(queue, worker(channel), { noAck: false })
      })
    })
  }
}

module.exports = AmqpConsumer