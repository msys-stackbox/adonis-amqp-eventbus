'use strict'

const amqp = require('amqplib');

const AmqpEventBusService = require('./AmqpEventBusService');
/**
 * adonis-amqp-eventbus
 *
 * (c) Jinggo Villamor <jcvillamor@multisyscorp.com>
 *
 */
class AmqpProducer extends AmqpEventBusService {

  constructor(Config) {
    super(Config, 'Producer');
  }

  async publish(queue, context, callback) {
    
    this._connection.then(channel => {
      return channel.assertQueue(queue, { durable: true }).then(() => {

        channel.sendToQueue(queue, Buffer.from(context), { deliveryMode: true });

        if (callback) {
          callback(queue, context)
        }

        return channel.close();
      })
    }).finally(async () => { await this.closeConnection() });
  }
}

module.exports = AmqpProducer