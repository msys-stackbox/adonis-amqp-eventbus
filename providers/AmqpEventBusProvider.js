'use strict'

/**
 * adonis-amqp-eventbus
 *
 * (c) Jinggo Villamor <jcvillamor@multisyscorp.com>
 *
 */

const { ServiceProvider } = require('@adonisjs/fold')

class AmqpEventBusProvider extends ServiceProvider {
  register() {
    this.app.singleton('Adonis/Addons/AmqpEventBus', (app) => {
      const Config = app.use('Adonis/Src/Config')
      const AmqpEventBus = require('../src/AmqpEventBus')

      return new AmqpEventBus(Config)
    })

    this.app.alias('Adonis/Addons/AmqpEventBus', 'AmqpEventBus');
    this.app.bind('Adonis/Commands/Consume', () => require('../commands/Consume'));
    this.app.bind('Adonis/Commands/Publish', () => require('../commands/Publish'))
  }

  boot() {
    const ace = require('@adonisjs/ace');
    ace.addCommand('Adonis/Commands/Consume');
    ace.addCommand('Adonis/Commands/Publish');
  }
}

module.exports = AmqpEventBusProvider