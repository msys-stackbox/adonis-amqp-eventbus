'use strict'

const amqp = require('amqplib');

class AmqpEventBusService {
  constructor(Config, Type) {
    const host = Config.get('eventbus.rabbitmq_host');
    const user = Config.get('eventbus.rabbitmq_user');
    const password = Config.get('eventbus.rabbitmq_user');
    const port = Config.get('eventbus.rabbitmq_port');
    
    this.rabbitmqURL = `amqp://${user}:${password}@${host}:${port}`;

    this.type = Type;
  }

  async connect() {
    this._connection = amqp.connect(this.rabbitmqURL)
      .then(connection => {
        
        this._openConn = connection;
        
        return connection.createChannel();

      }).catch(console.warn);
  }

  async closeConnection() {
    this._openConn.close();
  }
}

module.exports = AmqpEventBusService;