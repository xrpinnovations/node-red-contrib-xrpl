/*
File:               get-information.js
Author:             Gazos <gazos@xrpi.io>
Date:               02/04/19
Last Modified Date: 30/06/19
Last Modified By:   Gazos <gazos@xrpi.io>
*/

// Import Dependencies
const XRPLib = require('../lib/xrp');
const BaseNode = require('../lib/base-node');

module.exports = function(RED) {
  'use strict';

  const nodeOptions = {
    config: {
      server: {isNode: true},
      address: {},
      selectionType: {},
      selection: {},
      orderBook: {},
      options: {},
      uid: {},
      pathfind: {},
      number: {},
    },
  };

  class GetInformation extends BaseNode {
    constructor(nodeDefinition) {
      super(nodeDefinition, RED, nodeOptions);
    }

    async onInput({parsedMessage, message}) {
      const {
        address,
        selectionType,
        selection,
        orderBook,
        options,
        uid,
        pathfind,
        number,
      } = parsedMessage;

      if (selection !== 'parseAccountFlags' && this.api.isConnected()) {
        if (selectionType == 'account') {
          XRPLib.getAccountInformation(this.api, address, selection, options, orderBook).then((response) => this.send({payload: response})).catch((error)=> {
            this.setStatusFailed('Error');
            this.send({payload: error});
          });
        } else if (selectionType == 'ledger') {
          XRPLib.getLedgerInformation(this.api, selection, uid, options, pathfind).then((response) => this.send({payload: response})).catch((error)=> {
            this.setStatusFailed('Error');
            this.send({payload: error});
          });
        }
      } else if (selection === 'parseAccountFlags') {
        this.send({payload: XRPLib.parseAccountFlags(number)});
      } else {
        this.setStatusFailed('Error, Disconnected');
        this.warn('Error, Disconnected from RippleAPI');
        return;
      }
    }
  }
  // Register the node by name. This must be called before overriding any of the
  // Node functions.
  RED.nodes.registerType('get-information', GetInformation);
};
