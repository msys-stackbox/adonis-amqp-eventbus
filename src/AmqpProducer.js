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

  constructor(Config, logger) {
    super(Config, logger, 'Producer')
    this._offlinePubQueue = []
  }

  async publish(exchange, routingKey, content) {
    try {
      this._pubChannel.assertExchange(exchange, 'fanout', {
        durable: false
      })

      this._pubChannel.publish(exchange, routingKey, Buffer.from(content), { persistent: true },
        (err, _ok) => {
          if (err) {
            this.logger.error('[AMQP Producer] publish error:', err)
            this._offlinePubQueue.push([exchange, routingKey, content])
            this._pubChannel.connection.close()
          }
        })
    } catch (e) {
      this.logger.error('[AMQP Producer] channel publish failure. Re-establishing...')
      this._offlinePubQueue.push([exchange, routingKey, content])
    }
  }

  sendPending() {
    if (this._offlinePubQueue.length > 0) {
      var [exchange, routingKey, content] = this._offlinePubQueue.shift()
      this.publish(exchange, routingKey, content)
    }

    setTimeout(() => this.sendPending(), 5000)
  }

  async startPublisher() {
    this._connection.createConfirmChannel((err, ch) => {
      if (this.closeOnErr(err)) return
      ch.on('error', function (err) {
        this.logger.error(`[AMQP Producer] channel error ${err.message}`)
      })
      ch.on('close', function () {
        this.logger.info('[AMQP Producer] channel closed')
      })

      this._pubChannel = ch

      this.sendPending()
    })
  }
}

module.exports = AmqpProducer