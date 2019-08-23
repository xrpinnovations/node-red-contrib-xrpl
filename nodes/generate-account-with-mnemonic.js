/*
File:               generate-account-with-mnemonic.js
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

  class GenerateAccountWithMnemonic extends BaseNode {
    constructor(nodeDefinition) {
      super(nodeDefinition, RED);
    }

    async onInput({parsedMessage, message}) {
      const mnemonic = this.credentials.mnemonic;

      this.setStatus({});

      // check mnemonic and check it is at least 24 words long
      if (mnemonic != null && !mnemonic.match(/^\s*\S+(?:\s+\S+){23,}\s*$/gm)) {
        this.setStatusFailed('Mnemonic error');
        this.warn('[Mnemonic] is not 24 words or more');
        return;
      }

      try {
        XRPLib.generateAccountWithMnemonic(mnemonic).then((response) => {
          this.send({payload: response});
        });
      } catch (error) {
        this.setStatusFailed('Error');
        this.warn(error);
        return;
      }
    }
  }

  // Register the node by name. This must be called before overriding any of the
  // Node functions.
  RED.nodes.registerType('generate-account-with-mnemonic', GenerateAccountWithMnemonic, {
    credentials: {
      mnemonic: {type: 'password'},
    },
  });
};
