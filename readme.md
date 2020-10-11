# adonis-amqp-eventbus

An implementation of AMQP eventbus for Adonis.

## Register provider
Register provider inside `start/app.js` file.

```js
const providers = [
  '@adonisjs/amqpeventbus/providers/amqpeventbus'
]
```

```js
const AmqpEventBus = use('AmqpEventBus')
```


Publish

```js
const options = { deliveryMode: true, durable: true };

const cb = (msg) => { console.log(msg) }

AmqpEventBus.publish('queue_name', msg, options, cb)
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

