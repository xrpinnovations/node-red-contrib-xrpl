/*
File:               prepare-payment.js
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
      address: {},
      payment: {},
      instructions: {},
    },
  };

  class PreparePayment extends BaseNode {
    constructor(nodeDefinition) {
      super(nodeDefinition, RED, nodeOptions);
    }

    async onInput({parsedMessage, message}) {
      const {
        address,
        payment,
        instructions,
      } = parsedMessage;

      XRPLib.preparePayment(this.api, address, payment, instructions).then((response) => {
        this.send({payload: response});
      })
          .catch((error)=>{
            this.setStatusFailed('Error');
            this.error(error, message);
            return;
          });
    }
  }
  // Register the node by name. This must be called before overriding any of the
  // Node functions.
  RED.nodes.registerType('prepare-payment', PreparePayment);
};
