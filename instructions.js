'use strict'

/**
 * adonis-amqp-eventbus
 *
 * (c) Jinggo Villamor <jcvillamor@multisyscorp.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const path = require('path')

module.exports = async (cli) => {
  try {
    await cli.copy(
      path.join(__dirname, './config/config.js'),
      path.join(cli.helpers.configPath(), 'eventbus.js')
    )
    await cli.command.completed('create', 'config/eventbus.js')
  } catch (error) {
    // ignore error
  }
}
