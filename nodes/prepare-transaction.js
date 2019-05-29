/*
File:               prepare-transaction.js
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
    function PrepareTransaction(n) {
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
          var transaction, instruction;

          if (n.transaction != ""){
            if (n.transactionType === "json")
              transaction = JSON.parse(n.transaction);
            else if (n.transactionType === "msg")
              transaction = RED.util.getObjectProperty(msg, n.transaction);
          }
          else if (msg.payload.transaction != undefined) transaction = msg.payload.transaction;
          else {
            node.error("Missing Transaction");
            return;
          }

          if (n.instruction != ""){
            if (n.instructionType === "json")
              instruction = JSON.parse(n.instruction);
            else if (n.instructionType === "msg")
              instruction = RED.util.getObjectProperty(msg, n.instruction);
          }
          else if (msg.payload.instruction != undefined) instruction = msg.payload.instruction;

          if (server.isConnected()){
            try {
              if (transaction != {} && transaction != null && transaction != ""){
                XRPLib.prepareTransaction(server, transaction, instruction).then((preparedTx) => {
                  msg.payload = preparedTx;
                  this.send(msg);
                }).catch ((e) => {
                  msg.payload = e;
                  this.send(msg);
                });
              }
              else {
                msg.error = "Error, invalid transaction";
                this.send(msg);
              }
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
    RED.nodes.registerType("prepare-transaction", PrepareTransaction);

}
