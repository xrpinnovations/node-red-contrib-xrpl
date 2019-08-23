/*
File:               sign-transaction.js
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
      txJSON: {},
      signAs: {},
    },
  };

  class SignTransaction extends BaseNode {
    constructor(nodeDefinition) {
      super(nodeDefinition, RED, nodeOptions);
    }

    async onInput({parsedMessage, message}) {
      const {
        txJSON,
        signAs,
      } = parsedMessage;

      let credentials;

      if (this.credentials.secret != null) {
        credentials = this.credentials.secret;
      } else if (message.payload.secret != null) {
        credentials = message.payload.secret;
      } else if (this.credentials.publicKey != null && this.credentials.privateKey != null) {
        credentials = {publicKey: this.credentials.publicKey, privateKey: keypair.privateKey = this.credentials.privateKey};
      } else if (message.payload.keypair != null) {
        credentials = message.payload.keypair;
      } else {
        this.setStatusFailed('Secret or Keypair Missing');
        this.error('Secret / Keypair Missing');
        return;
      }

      try {
        if (typeof message.payload !== 'object') message.payload = {txJSON: txJSON};
        message.payload.signedTX = XRPLib.signTransaction(JSON.stringify(txJSON), credentials, signAs);
        this.send(message);
      } catch (error) {
        this.setStatusFailed('Error');
        this.error(error);
        return;
      }
    }
  }

  // Register the node by name. This must be called before overriding any of the
  // Node functions.
  RED.nodes.registerType('sign-transaction', SignTransaction, {
    credentials: {
      secret: {type: 'password'},
      publicKey: {type: 'password'},
      privateKey: {type: 'password'},
    },
  });
};
