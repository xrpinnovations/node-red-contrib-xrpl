/*
File:               send-xrp.js
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

  // Helper Functions
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const nodeOptions = {
    config: {
      server: {isNode: true},
      address: {},
      payment: {},
      validate: {},
      waitTime: {},
    },
  };

  class SendXRP extends BaseNode {
    constructor(nodeDefinition) {
      super(nodeDefinition, RED, nodeOptions);
    }

    async onInput({parsedMessage, message}) {
      const {
        address,
        payment,
        validate,
        waitTime,
      } = parsedMessage;

      let secret;

      if (this.credentials.secret != null) {
        secret = this.credentials.secret;
      } else if (message.payload.secret != null) {
        secret = message.payload.secret;
      } else {
        this.setStatusFailed('Secret Missing');
        this.error('Secret Missing');
        return;
      }

      if (!XRPLib.isValidSecret(secret)) {
        this.setStatusFailed('Secret Invalid');
        this.error('Secret Invalid');
        return;
      }

      message.payload = {};

      XRPLib.preparePayment(this.api, address, payment, {}).then((response) => {
        message.payload.txJSON = response.txJSON;

        try {
          message.payload.signedTX = XRPLib.signTransaction(JSON.stringify(response.txJSON), secret);

          XRPLib.submitSignedTransaction(this.api, message.payload.signedTX.signedTransaction).then((txResult) => {
            message.payload.txResult = txResult;

            if (validate) {
              const checkTransaction= async () => {
                await delay(waitTime * 1000); // convert to milliseconds
                return XRPLib.getTransaction(this.api, message.payload.signedTX.id, {}).then((result) => {
                  message.payload.validatedTX = result;
                  this.send(message);
                }).catch((error) => {
                  this.setStatusFailed('Error');
                  this.error(error, message);
                });
              };
              checkTransaction().catch((error) => {
                this.setStatusFailed('Error');
                this.error(error, message);
              });
            } else {
              this.send(message);
            }
          }).catch((error) => {
            this.setStatusFailed('Error');
            this.error(error, message);
            return;
          });
        } catch (error) {
          this.setStatusFailed('Error');
          this.error(error, message);
          return;
        }
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
  RED.nodes.registerType('send-xrp', SendXRP, {
    credentials: {
      secret: {type: 'password'},
    },
  });
};
