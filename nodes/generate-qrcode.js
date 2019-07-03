/*
File:               generate-qrcode.js
Author:             Gazos <gazos@xrpi.io>
Date:               02/04/19
Last Modified Date: 30/06/19
Last Modified By:   Gazos <gazos@xrpi.io>
*/

// Import Dependencies
const QRCode = require('qrcode');
const BaseNode = require('../lib/base-node');

module.exports = function(RED) {
  'use strict';

  const nodeOptions = {
    config: {
      data: {},
    },
  };

  class GenerateQrCode extends BaseNode {
    constructor(nodeDefinition) {
      super(nodeDefinition, RED, nodeOptions);
    }

    async onInput({parsedMessage, message}) {
      const {
        data,
      } = parsedMessage;

      this.setStatus({});

      try {
        QRCode.toDataURL(data, {margin: 1, color: {dark: '#000000ff', light: '#ffffffff'}})
            .then((url) => {
              this.send({payload: url});
            })
            .catch((error) => {
              this.setStatusFailed('QR Creation Fail');
              this.node.warn('[QR] Error: ' + error);
              return;
            });
      } catch (error) {
        this.setStatusFailed('QR Creation Fail');
        this.node.warn('[QR] Error: ' + error);
        return;
      }
    }
  }

  // Register the node by name. This must be called before overriding any of the
  // Node functions.
  RED.nodes.registerType('generate-qrcode', GenerateQrCode);
};
