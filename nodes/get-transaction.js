/*
File:               get-transaction.js
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
    function GetTransaction(n) {
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

          var transaction;

          if (n.transaction != "") transaction = n.transaction;
          else transaction = msg.payload.signedTX.id;

          if (server.isConnected()){
            try {
              XRPLib.getTransaction(server, transaction).then((result) => {
                msg.payload = result;
                this.send(msg);
              });
            } catch (error) {
              msg.error = error;
              this.send(msg);
            }
          }
          else {
            msg.error = "Error, Disconnected from RippleAPI";
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
    RED.nodes.registerType("get-transaction", GetTransaction);

}
