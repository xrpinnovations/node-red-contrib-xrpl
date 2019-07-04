/*
File:               combine-signatures.js
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
      signedTransactions: {},
    },
  };

  class CombineSignatures extends BaseNode {
    constructor(nodeDefinition) {
      super(nodeDefinition, RED, nodeOptions);
    }

    async onInput({parsedMessage, message}) {
      const {
        signedTransactions,
      } = parsedMessage;

      try {
        this.send({payload: {signedTX: XRPLib.combineSignatures(signedTransactions)}});
      } catch (error) {
        this.setStatusFailed('Error');
        this.error(error);
        return;
      }
    }
  }

  // Register the node by name. This must be called before overriding any of the
  // Node functions.
  RED.nodes.registerType('combine-signatures', CombineSignatures);
};
