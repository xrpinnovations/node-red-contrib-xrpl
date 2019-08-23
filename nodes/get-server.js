/*
File:               get-server.js
Author:             Gazos <gazos@xrpi.io>
Date:               02/04/19
Last Modified Date: 30/06/19
Last Modified By:   Gazos <gazos@xrpi.io>
*/

// Import Dependencies
const RippleAPI = require('ripple-lib').RippleAPI;
const apiMainNet = new RippleAPI({server: 'wss://s2.ripple.com:443'});
const apiTestNet = new RippleAPI({server: 'wss://s.altnet.rippletest.net:51233'});

function getApiType(testnet, overideServerAddress) {
  if (overideServerAddress) {
    if (overideServerAddress.startsWith('wss://') || overideServerAddress.startsWith('ws://') || overideServerAddress.startsWith('wss+unix://') || overideServerAddress.startsWith('ws+unix://')) {
      return new RippleAPI({server: overideServerAddress});
    } else {
      throw 'Unrecognised Server format, must be a websocket string';
    }
  } else {
    if (testnet === true) {
      return apiTestNet;
    } else {
      return apiMainNet;
    }
  }
}

module.exports = function(RED) {
  'use strict';

  class GetServer {
    constructor(n) {
      // Need to bring in NodeRed dependency and properly extend Node class, or just make this class a node handler
      RED.nodes.createNode(this, n);
      this.node = this;

      this.testnet = n.testnet;
      this.subscribe = n.subscribe;
      try {
        this.api = getApiType(n.testnet, n.overideServerAddress);
        this.api.setMaxListeners(0);
      } catch (error) {
        this.error(error);
      }

      if (this.api) {
        this.api.on('error', (errorCode, errorMessage) => {
          this.node.debug('RippleAPI Connection Error: errorCode: ' + errorMessage);
        });
        this.api.on('connected', () => {
          this.node.debug('Connected to RippleAPI');
        });
        this.api.on('disconnected', (code) => {
          // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
          // will be 1000 if this was normal closure
          this.node.debug('Disconnected from RippleAPI, code:', code);
        });
      }

      this.api.connect().then((resp) => {
        if (this.subscribe !== undefined && this.subscribe.length > 0) {
          try {
            for (const account of this.subscribe) {
              if (!this.api.isValidAddress(account.trim())) {
                this.error('Invalid XRP Account in subscription list');
                return;
              }
            }
            this.api.request('subscribe', {
              accounts: this.subscribe,
            }).then((response) => {
              if (response.status === 'success') {
                this.node.debug('Successfully subscribed');
              }
            }).catch((error) => {
              this.error(error);
            });
          } catch (error) {
            this.error(error);
          }
        }
      }).catch((error) => {
        this.error(error);
      });
    }

    isConnected() {
      return this.api.isConnected();
    }

    getApi() {
      return this.api;
    }
  }
  RED.nodes.registerType('get-server', GetServer);
};
