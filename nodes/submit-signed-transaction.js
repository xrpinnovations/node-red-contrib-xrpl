/*
File:               submit-signed-transaction.js
Author:             Gazos <gazos@xrpi.io>
Date:               02/04/19
Last Modified Date: 28/05/19
Last Modified By:   Gazos <gazos@xrpi.io>
*/

// Import Dependencies
const XRPLib = require('../lib/xrp');

module.exports = function(RED) {
    "use strict";

    // The main node definition - most things happen in here
    function SubmitSignedTransaction(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;
        // create a msg object
        var msg = {};

        var server = RED.nodes.getNode(n.server);
        server.connect();

        // when an input is recieved
        this.on('input', function (msg) {
          var signedTransaction;

          if (n.signedTransaction != "") signedTransaction = n.signedTransaction;
          else signedTransaction= msg.payload.signedTX.signedTransaction;

          if (server.isConnected()){
            try {
              XRPLib.submitSignedTransaction(server, signedTransaction).then((txResult) => {
                msg.payload.txResult = txResult;
                this.send(msg);
              }).catch((e) => {
                msg.payload = e;
                this.send(msg);
              });
            } catch (e) {
              msg.payload = e;
              this.send(msg);
            }
          }
          else {
            msg.payload = "Error, Disconnected from RippleAPI";
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
    RED.nodes.registerType("submit-signed-transaction", SubmitSignedTransaction);

}
