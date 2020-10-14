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

AmqpProducer.publish('example-exchange', 'routing-key', 'context-message');
```


## Consume

This will boot on startup. `start/hooks.js`

```js
const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  const AmqpConsumer = use('AmqpConsumer');
  AmqpConsumer.startConsumer();
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

  /*
  * Consumer to listeners
  */
  consumers: [
    {
      queueName: 'user-registered',
      exchange: 'user-exchange',
      handler: (content) => console.log('From registered %s',content.content.toString())
    },
    {
      queueName: 'user-aggregated',
      exchange: 'user-exchange',
      handler: (content) => console.log('From aggregated %s', content.content.toString())
    }
  ]
}
```

The config file is saved as `config/eventbus.js`.