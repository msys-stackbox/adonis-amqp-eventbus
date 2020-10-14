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
  rabbitmq_host: Env.get('RABBITMQ_URL') || 'localhost',
  rabbitmq_host: Env.get('RABBITMQ_PORT') || '5672',
  rabbitmq_user: Env.get('RABBITMQ_USER') || 'user',
  rabbitmq_password: Env.get('RABBITMQ_PASSWORD') || 'password',
}