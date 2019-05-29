/*
File:               prepare-escrow-execution.js
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
    function PrepareEscrowExecution(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        var server = RED.nodes.getNode(n.server);
        server.connect();

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;
        // create a msg object
        var msg = {};

        // when an input is recieved
        this.on('input', function (msg) {
          var escrowExecution = {};
          var address, instructions;

          if (n.address !== "") address = n.address;

          if (n.address !== "") escrowExecution.owner = n.address;
          if (n.escrowSequence !== "") escrowExecution.escrowSequence = parseInt(n.escrowSequence);
          if (n.condition !== "") escrowExecution.condition = n.condition;
          if (n.fulfillment !== "") escrowExecution.fulfillment = n.fulfillment;
          if (n.memos !== "") escrowExecution.memos = n.memos;

          if (n.instructions != ""){
            if (n.instructionsType === "json")
              instructions = JSON.parse(n.instructions);
            else if (n.instructionsType === "msg")
              instructions = RED.util.getObjectProperty(msg, n.instructions);
          }
          else if (msg.payload.instructions != undefined) instructions = msg.payload.instructions;

          if (server.isConnected()){
            try {
              if (XRPLib.isValidAddress(address)){
                XRPLib.prepareEscrowExecution(server, address, escrowExecution, instructions).then((response) => {
                  msg.payload = response;
                  this.send(msg);
                });
              }
              else {
                msg.error = "Error, invalid XRP address";
                this.send(msg);
              }
            }
            catch (error) {
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
    RED.nodes.registerType("prepare-escrow-execution", PrepareEscrowExecution);

}
