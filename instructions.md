## Register provider
Register provider inside `start/app.js` file.

```js
const providers = [
  'adonis-amqp-eventbus/providers/AmqpEventBusProvider'
]
```

```js
const AmqpEventBus = use('AmqpEventBus')
```

Publish

```js

const msg = "Hello world";

AmqpProducer.publish('queue_name', msg, (context, b) => {
  // Callback once you send the message
});
```

Consume

```js
AmqpEventBus.consume('queue_name', (channel) => (message) => {
  if (message === null) return;

  const body = message.content.toString();
  console.log(" [x] Received '%s'", body);
  channel.ack(message);
})
```

## Config

The config file is saved as `config/eventbus.js`.