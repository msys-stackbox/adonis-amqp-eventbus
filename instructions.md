## Register provider
Register provider inside `start/app.js` file.

```js
const providers = [
  'adonis-amqp-eventbus/providers/AmqpEventBusProvider'
]
```

Publish

```js
const AmqpProducer = use('AmqpProducer');

const msg = "Hello world";

AmqpProducer.publish('queue_name', msg, (queuename, context) => {
  // Callback when message sent
});
```

Publish without callback

```js
const AmqpProducer = use('AmqpProducer');

AmqpProducer.publish('queue_name', msg);
```

Consume

```js
const AmqpConsumer = use('AmqpConsumer');

AmqpEventBus.consume('queue_name', (channel) => (message) => {
  if (message === null) return;

  const body = message.content.toString();
  console.log(" [x] Received '%s'", body);
  channel.ack(message);
})
```

## Config

The config file is saved as `config/eventbus.js`.