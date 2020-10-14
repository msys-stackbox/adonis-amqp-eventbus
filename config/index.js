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
  rabbitmq_host: Env.get('RABBITMQ_HOST') || 'localhost',
  rabbitmq_port: Env.get('RABBITMQ_PORT') || '5672',
  rabbitmq_user: Env.get('RABBITMQ_USER') || 'user',
  rabbitmq_password: Env.get('RABBITMQ_PASSWORD') || 'password',

  /*
  * Consumer to listeners
  */
  consumers: [
    {
      queueName: 'user-registered',
      exchange: 'user-exchange',
      handler: (content) => console.log('From registered %s', content.content.toString())
    },
    {
      queueName: 'user-aggregated',
      exchange: 'user-exchange',
      handler: (content) => console.log('From aggregated %s', content.content.toString())
    }
  ]
}