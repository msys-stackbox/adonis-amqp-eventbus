'use strict'

const { Command } = use('@adonisjs/ace');

const AmqpProducer = use('AmqpProducer');

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
    
    await AmqpProducer.publish('test', msg, (context, b) => {
      console.log('Callbacked here', context);
    });
  }
}

module.exports = Publish;