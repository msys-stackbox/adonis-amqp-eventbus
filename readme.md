# adonis-amqp-eventbus

A beta implementation of AMQP eventbus for Adonis. This implementation is limited to AMQP queue only. Used it in production at your own risk.

## Roadmaps

* To implement exchange
* To implement unit testing

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

```js
const AmqpEventBus = use('AmqpEventBus')
```


Publish

```js

const msg = "Hello world";

AmqpProducer.publish('queue_name', msg, (queuename, context) => {
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

