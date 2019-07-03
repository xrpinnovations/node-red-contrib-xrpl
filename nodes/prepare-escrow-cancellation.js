/*
File:               prepare-escrow-cancellation.js
Author:             Gazos <gazos@xrpi.io>
Date:               02/04/19
Last Modified Date: 30/06/19
Last Modified By:   Gazos <gazos@xrpi.io>
*/

// Import Dependencies
const BaseNode = require('../lib/base-node');
const XRPLib = require('../lib/xrp');

module.exports = function(RED) {
  'use strict';

  const nodeOptions = {
    config: {
      server: {isNode: true},
      address: { },
      escrowCancellation: { },
      instructions: { },
    },
  };

  class PrepareEscrowCancellation extends BaseNode {
    constructor(nodeDefinition) {
      super(nodeDefinition, RED, nodeOptions);
    }

    async onInput({parsedMessage, message}) {
      const {
        address,
        escrowCancellation,
        instructions,
      } = parsedMessage;

      XRPLib.prepareEscrowCancellation(this.api, address, escrowCancellation, instructions).then((response) => {
        this.send({payload: response});
      })
          .catch((error)=>{
            this.setStatusFailed('Error');
            this.error(error);
            return;
          });
    }
  }

  // Register the node by name. This must be called before overriding any of the
  // Node functions.
  RED.nodes.registerType('prepare-escrow-cancellation', PrepareEscrowCancellation);
};
