'use strict'

/**
 * adonis-amqp-eventbus
 *
 * (c) Jinggo Villamor <jcvillamor@multisyscorp.com>
 *
 */

const { ServiceProvider } = require('@adonisjs/fold')

const AmqpProducer = require('../src/AmqpProducer');
const AmqpConsumer = require('../src/AmqpConsumer')

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
    this.app.bind('Adonis/Commands/Publish', () => require('../commands/Publish'));
    this.app.bind('Adonis/Commands/Consume', () => require('../commands/Consume'));
  }

  boot() {
    const ace = require('@adonisjs/ace');
    ace.addCommand('Adonis/Commands/Publish');
    ace.addCommand('Adonis/Commands/Consume');
  }
}

module.exports = AmqpEventBusProvider;



// class AmqpEventBusProvider extends ServiceProvider {
//   register() {
//     this.app.singleton('Adonis/Addons/AmqpEventBus', (app) => {
//       const Config = app.use('Adonis/Src/Config')
//       const AmqpEventBus = require('../src/AmqpEventBus')

//       return new AmqpEventBus(Config)
//     })

//     this.app.alias('Adonis/Addons/AmqpEventBus', 'AmqpEventBus');
//     this.app.bind('Adonis/Commands/Consume', () => require('../commands/Consume'));
//     this.app.bind('Adonis/Commands/Publish', () => require('../commands/Publish'))
//   }

//   boot() {
//     const ace = require('@adonisjs/ace');
//     ace.addCommand('Adonis/Commands/Consume');
//     ace.addCommand('Adonis/Commands/Publish');
//   }
// }

// module.exports = AmqpEventBusProvider