/*
File:               sign-transaction.js
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
    function SignTransaction(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;
        // create a msg object
        var msg = {};

        // when an input is recieved
        this.on('input', function (msg) {
          var secret, txJSON;

          if (this.credentials.secret != null){
            if (XRPLib.isValidSecret(this.credentials.secret))
              secret = this.credentials.secret;
            else {
              node.error("Secret invalid");
              return;
            }
          }
          else if (msg.payload.secret != null){
            secret = msg.payload.secret;
          }
          else {
            node.error("Secret missing");
            return;
          }
          if (n.txjson != "") txJSON = n.txjson;
          else txJSON = msg.payload.txJSON;

          try {
              msg.payload.signedTX = XRPLib.signTransaction(txJSON, secret);
              this.send(msg);
          } catch (e) {
            msg.payload = e;
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
    RED.nodes.registerType("sign-transaction", SignTransaction,{
      credentials: {
        secret: {type:"password"}
      }
    });

}
