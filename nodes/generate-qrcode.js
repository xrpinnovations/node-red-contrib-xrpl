/*
File:               generate-qrcode.js
Author:             Gazos <gazos@xrpi.io>
Date:               02/04/19
<<<<<<< HEAD
Last Modified Date: 30/06/19
=======
Last Modified Date: 02/06/19
>>>>>>> f838fe6027e13921294fc39a5468b08b2581f54e
Last Modified By:   Gazos <gazos@xrpi.io>
*/

// Import Dependencies
const QRCode = require('qrcode');
const BaseNode = require('../lib/base-node');

module.exports = function(RED) {
<<<<<<< HEAD
  'use strict';

  const nodeOptions = {
    config: {
      data: {},
    },
  };

  class GenerateQrCode extends BaseNode {
    constructor(nodeDefinition) {
      super(nodeDefinition, RED, nodeOptions);
=======
    "use strict";

    // The main node definition - most things happen in here
    function GenerateQrCode(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;
        // create a msg object
        var msg = {};

        // when an input is recieved
        this.on('input', function (msg) {
          var address;
          if (n.address != "") address = n.address;
          else address = msg.payload;

          try {

            QRCode.toDataURL(msg.payload, {margin: 1,  color: {dark: '#000000ff', light: '#ffffffff'}})
              .then(url => {
                msg.payload = url;
                this.send(msg);
              })
              .catch(error => {
                msg.error = error;
                this.send(msg);
              })

          } catch (error) {
            msg.error = error;
            this.send(msg);
          }
        });

        this.on("close", function() {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: node.client.disconnect();
        });
>>>>>>> f838fe6027e13921294fc39a5468b08b2581f54e
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
