'use strict'

// const amqp = require('amqplib');

const amqp = require('amqplib/callback_api')

class AmqpEventBusService {
  constructor(Config, logger, Type) {
    const host = Config.get('eventbus.rabbitmq_host');
    const user = Config.get('eventbus.rabbitmq_user');
    const password = Config.get('eventbus.rabbitmq_password');
    const port = Config.get('eventbus.rabbitmq_port');
    
    this.rabbitmqURL = `amqp://${user}:${password}@${host}:${port}`;

    this.logger = logger;
    this.type = Type;
  }

  async connect(onEnd) {
    this.logger.info(`[AMQP ${this.type}] Trying to connect to ${this.rabbitmqURL}`)
    amqp.connect(this.rabbitmqURL, {}, (err, connection) => {
      if (err) {
        this.logger.info(err)
        return setTimeout(() => this.connect(onEnd), 1000)
      }

      this.logger.info(`[AMQP ${this.type}] connection established`)
      this._connection = connection
      this.initConnection()

      return onEnd()
    })
  }

  initConnection() {
    this._connection.on('error', (err) => {
      if (err.message !== 'Connection closing') {
        this.logger.error(`[AMQP ${this.type}] conn error ${err.message}`)
      }
    })

    this._connection.on('close', () => {
      this.logger.error('[AMQP] reconnecting')
      return setTimeout(() => this.connect(() => { this.logger.info('[AMQP] ended') }), 1000)
    })
  }

  closeOnErr(err) {
    if (!err) return false
    this.logger.error('[AMQP] error', err)
    this._connection.close()
    return true
  }
}

module.exports = AmqpEventBusService;