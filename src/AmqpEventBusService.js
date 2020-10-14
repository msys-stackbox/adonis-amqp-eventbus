'use strict'

const amqp = require('amqplib');

class AmqpEventBusService {
  constructor(Config, Type) {
    this.rabbitmqURL = Config.get('eventbus.rabbitmqURL');
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