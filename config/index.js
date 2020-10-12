'use strict'

const Env = use('Env');

/*
|--------------------------------------------------------------------------
| Amqp Event Bus
|--------------------------------------------------------------------------
|
| Amqp event buss configuration
|
*/

module.exports = {
  /*
  | RabbitMQ Connection String
  |
  */
  rabbitmqURL: Env.get('RABBIT_MQ_URL') ?? 'amqp://guest:guest@localhost:5672'
}