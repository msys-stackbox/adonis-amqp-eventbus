'use strict'

/**
 * adonis-amqp-eventbus
 *
 * (c) Jinggo Villamor <jcvillamor@multisyscorp.com>
 *
 */

const { ServiceProvider } = require('@adonisjs/fold')

const AmqpProducer = require('../src/AmqpProducer');
const AmqpConsumer = require('../src/AmqpConsumer');

class AmqpEventBusProvider extends ServiceProvider {
  
  register() {
    this.app.singleton('Adonis/Addons/AmqpConsumer', () => {
      const Config = this.app.use('Adonis/Src/Config')
      const Logger = this.app.use('Logger')

      const consumer = new AmqpConsumer(Config, Logger);

      consumer.connect();

      return consumer;
    })

    this.app.singleton('Adonis/Addons/AmqpProducer', () => {
      const Config = this.app.use('Adonis/Src/Config')
      const Logger = this.app.use('Logger')

      const producer = new AmqpProducer(Config, Logger);
      
      producer.connect();

      return producer;
    })

    this.app.alias('Adonis/Addons/AmqpProducer', 'AmqpProducer');
    this.app.alias('Adonis/Addons/AmqpConsumer', 'AmqpConsumer');
  }
}

module.exports = AmqpEventBusProvider;