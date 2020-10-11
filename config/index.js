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
  |--------------------------------------------------------------------------
  | Credentials
  |--------------------------------------------------------------------------
  |
  | RabbitMQ Credentials
  |
  */
  username: Event.get('AMQP_USERNAME') ?? 'admin',
  password: Event.get('AMQP_PASSWORD') ??'admin',
  host: Event.get('AMQP_HOST') ??' localhost'
}