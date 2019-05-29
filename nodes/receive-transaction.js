/*
File:               receive-transaction.js
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
    function ReceiveTransaction(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        var server = RED.nodes.getNode(n.server);
        server.connect();

        if(server.isConnected())
          this.status({fill:"green",shape:"dot",text:"connected"});
        else
          this.status({fill:"red",shape:"ring",text:"disconnected"});

        server.getApi().on('connected', () => {
          this.status({fill:"green",shape:"dot",text:"connected"});
        });
        server.getApi().on('disconnected', (code) => {
          this.status({fill:"red",shape:"ring",text:"disconnected " + code});
        });

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;
        // create a msg object
        var msg = {};

        server.getApi().connection.on('transaction', (event) => {
            // Do something useful with `event`
            msg.payload = event;

            if (n.address != ""){
              if (msg.payload.transaction.Destination === n.address) this.send(msg);
            }
            else {
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
    RED.nodes.registerType("receive-transaction", ReceiveTransaction);

}
