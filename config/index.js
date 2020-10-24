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
  * Consumer to listeners. You can add multiple consumers as you want
  *
  * This will automatically create an exchange and queue. Also, bind them automatically as well
  */
  consumers: [
    {
      queueName: 'test1:event.name:test2',
      exchange: 'event.name',
      handler: (ch) => (content) => {
        // ... todo here...
        ch.ack(content);
      }
    }
  ]
}