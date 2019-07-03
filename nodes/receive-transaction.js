/*
File:               receive-transaction.js
Author:             Gazos <gazos@xrpi.io>
Date:               02/04/19
Last Modified Date: 30/06/19
Last Modified By:   Gazos <gazos@xrpi.io>
*/

// Import Dependencies
const XRPLib = require('../lib/xrp');
const BaseNode = require('../lib/base-node');

module.exports = function(RED) {
  'use strict';

  const nodeOptions = {
    config: {
      server: {isNode: true},
      monitor: {},
    },
  };

  class ReceiveTransaction extends BaseNode {
    constructor(nodeDefinition) {
      super(nodeDefinition, RED, nodeOptions);

      const monitor = this.nodeConfig.monitor;

      for (const account of monitor) {
        if (!XRPLib.isValidAddress(account)) {
          this.setStatus({shape: 'dot', fill: 'red', text: 'Invalid XRP Address'});
          this.error('[Address] Invalid XRP Address: ' + account);
          return;
        }
      }
      this.api.connection.on('transaction', (event) => {
        // Check event matches monitored address
        if ( monitor.includes(event.transaction.Account) || monitor.includes(event.transaction.Destination)) {
          this.send({payload: event});
        }
      });
    }
  }

  // Register the node by name. This must be called before overriding any of the
  // Node functions.
  RED.nodes.registerType('receive-transaction', ReceiveTransaction);
};
