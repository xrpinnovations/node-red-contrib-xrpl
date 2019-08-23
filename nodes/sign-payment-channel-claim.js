/*
File:               sign-payment-channel-claim.js
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
      signPaymentChannelClaim: {},
    },
  };

  class SignPaymentChannelClaim extends BaseNode {
    constructor(nodeDefinition) {
      super(nodeDefinition, RED, nodeOptions);
    }

    async onInput({parsedMessage, message}) {
      const {
        signPaymentChannelClaim,
      } = parsedMessage;

      let privateKey;

      if (this.credentials.privateKey != null) {
        privateKey = this.credentials.privateKey;
      } else if (message.payload.privateKey != null) {
        privateKey = message.payload.privateKey;
      } else {
        this.setStatusFailed('Private Key Missing');
        this.error('Private Key Missing');
        return;
      }

      signPaymentChannelClaim.privateKey = privateKey;

      try {
        this.send({payload: XRPLib.signPaymentChannelClaim(signPaymentChannelClaim)});
      } catch (error) {
        this.setStatusFailed('Error');
        this.error(error);
        return;
      }
    }
  }
  // Register the node by name. This must be called before overriding any of the
  // Node functions.
  RED.nodes.registerType('sign-payment-channel-claim', SignPaymentChannelClaim, {
    credentials: {
      privateKey: {type: 'password'},
    },
  });
};
