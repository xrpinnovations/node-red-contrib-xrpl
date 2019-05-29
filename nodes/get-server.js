/*
File:               get-server.js
Author:             Gazos <gazos@xrpi.io>
Date:               02/04/19
Last Modified Date: 28/05/19
Last Modified By:   Gazos <gazos@xrpi.io>
*/

// Import Dependencies
const RippleAPI = require('ripple-lib').RippleAPI;
const apiMainNetFull = new RippleAPI({ server: 'wss://s2.ripple.com:443' });
const apiTestNet = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' });
//TODO ALLOW CUSTOM SERVERS

var events = require('events');
var eventEmitter = new events.EventEmitter();

function getApiType(testnet){
  if (testnet === true)
    return apiTestNet;
  else
    return apiMainNetFull;
}

module.exports = function(RED) {
    "use strict";

  class GetServer {
    constructor(n) {
        // Need to bring in NodeRed dependency and properly extend Node class, or just make this class a node handler
      RED.nodes.createNode(this, n);
      this.node = this;
      this.connecting = false;

      this.subscribe = n.subscribe;
      this.api = getApiType(n.testnet);

      this.api.on('error', (errorCode, errorMessage) => {
        this.node.warn('RippleAPI Connection Error: errorCode: ' + errorMessage);
      });
      this.api.on('connected', () => {
        this.node.warn('Connected to RippleAPI');
      });
      this.api.on('disconnected', (code) => {
        // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
        // will be 1000 if this was normal closure
        this.node.warn('Disconnected from RippleAPI, code:', code);
      });
    }
    connect(){
      if (!this.connecting && !this.api.isConnected()){
        this.connecting = true;
        this.api.connect().then(() => {
          this.connecting = false;
          if (this.subscribe){
            this.api.request('subscribe', {
                accounts: this.subscribe.split(",")
            }).then(response => {
                if (response.status === 'success') {
                    this.warn('Successfully subscribed')
                }
            }).catch(error => {
                // Handle `error`
            })
          }

        });
      }
    }

    isConnected(){
      return this.api.isConnected();
    }

    getApi(){
      return this.api;
    }
  }
  RED.nodes.registerType("get-server", GetServer);
}
