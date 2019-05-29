/*
File:               prepare-escrow-creation.js
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
    function PrepareEscrowCreation(n) {
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

          var escrowCreation = {};
          var address, instructions;

          if (n.address !== "") address = n.address;

          if (n.amount !== "") escrowCreation.amount = n.amount;
          if (n.destination !== "") escrowCreation.destination = n.destination;
          if (n.allowCancelAfter !== "") escrowCreation.allowCancelAfter = n.allowCancelAfter;
          if (n.allowExecuteAfter !== "") escrowCreation.allowExecuteAfter = n.allowExecuteAfter;
          if (n.condition !== "") escrowCreation.condition = n.condition;
          if (n.destinationTag !== "") escrowCreation.destinationTag = n.destinationTag;
          if (n.memos !== "") escrowCreation.memos = n.memos;
          if (n.sourceTag !== "") escrowCreation.sourceTag = n.sourceTag;

          if (n.instructions != ""){
            if (n.instructionsType === "json")
              instructions = JSON.parse(n.instructions);
            else if (n.instructionType === "msg")
              instructions = RED.util.getObjectProperty(msg, n.instructions);
          }
          else if (msg.payload.instructions != undefined) instructions = msg.payload.instructions;

          if (server.isConnected()){
            try {
              if (XRPLib.isValidAddress(address || destination)){
                XRPLib.prepareEscrowCreation(server, address, escrowCreation, instructions).then((response) => {
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
    RED.nodes.registerType("prepare-escrow-creation", PrepareEscrowCreation);

}
