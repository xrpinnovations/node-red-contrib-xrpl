/*
File:               generate-qrcode.js
Author:             Gazos <gazos@xrpi.io>
Date:               02/04/19
Last Modified Date: 28/05/19
Last Modified By:   Gazos <gazos@xrpi.io>
*/

// Import Dependencies
const XRPLib = require('../lib/xrp');
const QRCode = require('qrcode');

module.exports = function(RED) {
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

            QRCode.toDataURL(msg.payload, {margin: 0,  color: {dark: '#FFF', light: '#0000'}})
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
    }

    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType("generate-qrcode", GenerateQrCode);

}
