/*
File:               generate-account-with-secret.js
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

  class GenerateAccoutWithSecret extends BaseNode {
    constructor(nodeDefinition) {
      super(nodeDefinition, RED);
    }

    async onInput({parsedMessage, message}) {
      const secret = this.credentials.secret;

      this.setStatus({});

      // get secret and check it is valid
      if (secret != null) {
        if (!XRPLib.isValidSecret(this.credentials.secret)) {
          this.setStatusFailed('Secret invalid');
          this.error('Secret invalid', message);
          return;
        }
      }

      try {
        this.send({payload: XRPLib.generateAccoutWithSecret(secret)});
      } catch (error) {
        this.setStatusFailed('Secret error');
        this.error(error, message);
        return;
      }
    };
  }

  // Register the node by name. This must be called before overriding any of the
  // Node functions.
  RED.nodes.registerType('generate-account-with-secret', GenerateAccoutWithSecret, {
    credentials: {
      secret: {type: 'password'},
    },
  });
};
