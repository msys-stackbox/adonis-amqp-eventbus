'use strict'

const { Command } = use('@adonisjs/ace');

const AmqpEventBus = use('AmqpEventBus')

class Publish extends Command {
  static get signature() {
    return 'eventbus:publish'
  }

  static get description() {
    return 'This will publish to AMQP topics/exchange/queue'
  }

  async handle() {

    const msg = await this.ask('Your message:');

    if (!msg) {
      throw 'Message was not set';
    }

    AmqpEventBus.publish('test', msg, {deliveryMode: true, durable: true }, (msg) => {
      console.log(msg);
    });
  }
}

module.exports = Publish;