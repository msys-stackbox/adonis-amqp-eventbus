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
  | RabbitMQ Credentials
  |
  */
  username: Env.get('AMQP_USERNAME') ?? 'admin',
  password: Env.get('AMQP_PASSWORD') ?? 'admin',

  /*
  | RabbitMQ Host
  |
  */
  host: Env.get('AMQP_HOST') ?? 'localhost'
}