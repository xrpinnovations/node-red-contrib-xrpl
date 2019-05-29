/*
File:               generate-account-with-mnemonic.js
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
    function GenerateAccountWithMnemonic(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;
        // create a msg object
        var msg = {};

        // when an input is recieved
        this.on('input', function (msg) {
          var mnemonic;
          //get set mnemonic and check it is at least 24 words long
          if (this.credentials.mnemonic != null){
            if (this.credentials.mnemonic.match(/^\s*\S+(?:\s+\S+){23,}\s*$/gm))
              mnemonic = this.credentials.mnemonic;
            else {
              node.error("Mnemonic is not 24 words or more");
              return;
            }
          }

          try {
            XRPLib.generateAccountWithMnemonic(mnemonic).then((response) => {
              msg.payload = response;
              this.send(msg);
            });

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
    RED.nodes.registerType("generate-account-with-mnemonic", GenerateAccountWithMnemonic,{
      credentials: {
        mnemonic: {type:"password"}
      }
    });

}
