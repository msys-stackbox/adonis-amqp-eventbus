'use strict'

const { Command } = use('@adonisjs/ace');

const AmqpConsumer = use('AmqpConsumer')

class Consume extends Command {
  static get signature() {
    return 'eventbus:consume'
  }

  static get description() {
    return 'This will consume from AMQP topics/exchange/queue'
  }

  async handle() {
    AmqpConsumer.consume('test', (channel) => (message) => {
      if (message === null) return;
      const body = message.content.toString();
      console.log(" [x] Received '%s'", body);
      channel.ack(message);
    });
  }
}

module.exports = Consume;