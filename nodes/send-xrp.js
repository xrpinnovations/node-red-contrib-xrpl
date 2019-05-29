/*
File:               send-xrp.js
Author:             Gazos <gazos@xrpi.io>
Date:               02/04/19
Last Modified Date: 28/05/19
Last Modified By:   Gazos <gazos@xrpi.io>
*/

// Import Dependencies
const XRPLib = require('../lib/xrp');
module.exports = function(RED) {
    "use strict";

    // Helper Functions
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // The main node definition - most things happen in here
    function SendXRP(n) {
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

          var sender, destination, tag, memos, amount, secret, validate, waitTime, invoiceID;

          var transaction = {}, instruction = {};

          transaction.TransactionType = "Payment";

          //REQUIRED
          if (n.sender != "") transaction.Account = n.sender;
          else if (msg.payload.sender != null) transaction.Account = msg.payload.sender;
          else if (!XRPLib.isValidAddress(transaction.Account)){
            node.error("Invalid Sender Address");
            return;
          }
          else {
            node.error("Missing Sender Address");
            return;
          }

          //REQUIRED
          if (n.destination != "") transaction.Destination = n.destination;
          else if (msg.payload.destination != null) transaction.Destination = msg.payload.destination;
          else if (!XRPLib.isValidAddress(transaction.Destination)){
            node.error("Invalid Destination Address");
            return;
          }
          else {
            node.error("Missing Destination Address");
            return;
          }

          //REQUIRED
          if (n.amount != "") transaction.Amount = XRPLib.xrpToDrops(n.amount);
          else if (msg.payload.amount != null) transaction.Amount = XRPLib.xrpToDrops(msg.payload.amount);
          else if (transaction.Amount < 0){
            node.error("Invalid Amount");
            return;
          }
          else {
            node.error("Missing Amount");
            return;
          }

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

          //OPTIONAL
          if (n.tag != "") transaction.DestinationTag = parseInt(n.tag);
          else if (msg.payload.tag != null) transaction.DestinationTag = parseInt(msg.payload.tag);

          //OPTIONAL
          if (n.memos != "") transaction.Memos = msg.payload.memos;
          else if (msg.payload.memos != null) transaction.Memos = msg.payload.memos;

          //OPTIONAL
          if (n.invoiceID != "") transaction.InvoiceID = msg.payload.invoiceID;
          else if (msg.payload.invoiceID != null) transaction.InvoiceID = msg.payload.invoiceID;

          //OPTIONAL
          if (n.validate != null) validate = n.validate;
          else if (msg.payload.validate != null) validate = msg.payload.validate;

          if (n.waitTime != null) waitTime = n.waitTime;
          else if (msg.payload.waitTime != null) waitTime = msg.payload.waitTime;
          else waitTime = 6;

          if (server.isConnected()){
            try {
              XRPLib.prepareTransaction(server, transaction, instruction).then((preparedTx) => {
                msg.payload = {};
                //msg.payload = preparedTx;
                //node.warn(preparedTx);
                msg.payload.signedTX = XRPLib.signTransaction(preparedTx.txJSON, secret);

                XRPLib.submitSignedTransaction(server, msg.payload.signedTX.signedTransaction).then((txResult) => {
                  msg.payload.resultTX = txResult;
                  if (validate) {

                    const checkTransaction= async () => {
                      await delay(waitTime * 1000); //convert to milliseconds
                      return XRPLib.getTransaction(server, msg.payload.signedTX.id).then((result) => {
                        msg.payload.validatedTX = result;
                        this.send(msg);
                      }).catch((e) => {
                        msg.payload = {errorType: "Validate Transaction", error: e};
                        this.send(msg);
                      });
                    };
                    checkTransaction().catch((e) => {
                      msg.payload = {errorType: "Check Transaction", error: e};
                      this.send(msg);
                    });
                  } else {
                    this.send(msg)
                  };
                }).catch((e) => {
                  msg.payload = {errorType: "Submit Signed Transaction", error: e};
                  this.send(msg);
                });
              }).catch((e) => {
                msg.payload = {errorType: "Prepare Transaction", error: e};
                this.send(msg);
              });
            }
            catch (e) {
              msg.payload = e;
              this.send(msg);
            }
          }
          else {
            node.error("Error, Disconnected from RippleAPI");
            return
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
    RED.nodes.registerType("send-xrp", SendXRP,{
      credentials: {
        secret: {type:"password"}
      }
    });

}
