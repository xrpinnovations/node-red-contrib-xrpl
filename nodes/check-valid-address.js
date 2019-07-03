/*
File:               check-valid-address.js
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
      address: {},
    },
  };

  class CheckValidAddress extends BaseNode {
    constructor(nodeDefinition) {
      super(nodeDefinition, RED, nodeOptions);
    }

    async onInput({parsedMessage, message}) {
      const {
        address,
      } = parsedMessage;

      // check to see if the address decodes to base 58 and contains a valid XRP characterset.
      this.send({payload: XRPLib.isValidAddress(address)});
    };
  }

  // Register the node by name. This must be called before overriding any of the
  // Node functions.
  RED.nodes.registerType('check-valid-address', CheckValidAddress);
};
