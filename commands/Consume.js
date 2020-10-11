'use strict'

const { Command } = use('@adonisjs/ace');

const AmqpEventBus = use('AmqpEventBus')

class Consume extends Command {
  static get signature() {
    return 'eventbus:consume'
  }

  static get description() {
    return 'This will consume from AMQP topics/exchange/queue'
  }

  async handle(args, options) {
    AmqpEventBus.consume('test', (channel) => (message) => {
      if (message === null) return;
      const body = message.content.toString();
      console.log(" [x] Received '%s'", body);
      console.log(" [x] Done");
      channel.ack(message);
    });
  }
}

module.exports = Consume;