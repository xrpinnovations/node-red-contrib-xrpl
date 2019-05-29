/*
File:               generate-account-with-secret.js
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
    function GenerateAccoutWithSecret(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;
        // create a msg object
        var msg = {};

        // when an input is recieved
        this.on('input', function (msg) {
          var secret;
          //get set secret and check it is valid
          if (this.credentials.secret != null){
            if (XRPLib.isValidSecret(this.credentials.secret))
              secret = this.credentials.secret;
            else {
              node.error("Secret invalid");
              return;
            }
          }
          try {
            msg.payload = XRPLib.generateAccoutWithSecret(secret);
            this.send(msg);
          } catch (error) {
            node.error(error);
            return;
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
    RED.nodes.registerType("generate-account-with-secret", GenerateAccoutWithSecret,{
      credentials: {
        secret: {type:"password"}
      }
    });

}
