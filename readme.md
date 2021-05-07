# adonis-amqp-eventbus

A beta implementation of AMQP eventbus for Adonis.
This is also based on this implimentation [adonisjs-rabbitmq](https://github.com/josemiguelmelo/adonisjs-rabbitmq)

## Installation

```bash
adonis install adonis-amqp-eventbus
```

## Register provider
Register provider inside `start/app.js` file.

```js
const providers = [
  'adonis-amqp-eventbus/providers/AmqpEventBusProvider'
]
```

## Publish

```js
const AmqpProducer = use('AmqpProducer');

/* Context message must be a string. If this is an object you may use JSON.stringify()*/
AmqpProducer.publish('example-exchange', 'routing-key', 'context-message');
```


## Consume

This will boot on startup. `start/hooks.js`

```js
const { hooks } = require('@adonisjs/ignitor');

hooks.after.httpServer(() => {
  use('AmqpConsumer');
})
```

## Config

```js
module.exports = {
  /*
  | RabbitMQ Connection String
  |
  */
  rabbitmq_host: Env.get('RABBITMQ_HOST') || 'localhost',
  rabbitmq_port: Env.get('RABBITMQ_PORT') || '5672',
  rabbitmq_user: Env.get('RABBITMQ_USER') || 'user',
  rabbitmq_password: Env.get('RABBITMQ_PASSWORD') || 'password',
  rabbitmq_protocol: Env.get('RABBITMQ_PROTOCOL') || 'amqp',

  /*
  * Consumer to listeners
  * 
  * This will automatically create an exchange and queue. Also, bind them automatically as well
  */
  consumers: [
    {
      queueName: 'user-registered',
      exchange: 'user-exchange',
      handler: (ch) => (context) => {
        //...your handler here
        ch.ack(context)
      })
    }
  ]
}
```

The config file is saved as `config/eventbus.js`.