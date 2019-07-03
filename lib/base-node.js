/*
File:               base-node.js
Author:             Gazos <gazos@xrpi.io>
Date:               04/06/19
Last Modified Date: 30/06/19
Last Modified By:   Gazos <gazos@xrpi.io>
*/

const XRPLib = require('../lib/xrp');
const DefaultOptions = require('../lib/default_options');
const Joi = require('@hapi/joi');
const merge = require('lodash.merge');
const selectn = require('selectn');

const utils = {
  selectn,
  merge,
  Joi,
  reach: (path, obj) => selectn(path, obj),
};

/**
 * BaseNode- Base node to share common variables/functions
 */
class BaseNode {
  constructor(nodeDefinition, RED, options = {config: {}}) {
    RED.nodes.createNode(this, nodeDefinition);
    this.node = this;
    this.RED = RED;
    this.options = merge({}, DefaultOptions.InputOptions, options);
    this._eventHandlers = _eventHandlers;
    this._internals = _internals;
    this.utils = utils;
    this.inError = null;

    this.nodeConfig = Object.entries(this.options.config).reduce(
        (acc, [key, config]) => {
          if (config.isNode) {
            acc[key] = this.RED.nodes.getNode(nodeDefinition[key]);
          } else if (typeof config === 'function') {
            acc[key] = config.call(this, nodeDefinition);
          } else {
            acc[key] = nodeDefinition[key];
          }
          return acc;
        },
        {}
    );

    this.node.on('input', this._eventHandlers.preOnInput.bind(this));
    this.node.on('close', this._eventHandlers.preOnClose.bind(this));

    this.testnet = this.reach('nodeConfig.server.testnet');

    if (this.api) {
      if (this.api.isConnected()) {
        if (!this.inError) {
          this.setStatusSuccess(
            this.testnet ? 'Connected to Testnet' : 'Connected to Livenet');
        }
      } else {
        this.setStatusFailed(
          this.testnet ? 'Disconnected from Testnet':'Disconnected from Livenet'
        );
      }
      this.api.on('connected', () => {
        if (!this.inError) {
          this.setStatusSuccess(
            this.testnet ? 'Connected to Testnet' : 'Connected to Livenet'
          );
        }
      });
      this.api.on('disconnected', (code) => {
        this.setStatusFailed('disconnected' + code);
      });
    }
    const name = this.reach('nodeConfig.name');
    this.debug(`instantiated node, name: ${name || 'undefined'}`);
  }

  // Subclasses should override these as hooks into common events
  onClose(removed) {}
  onInput() {}

  send() {
    this.node.send(...arguments);
  }

  setStatus(opts = {shape: 'dot', fill: 'blue', text: ''}) {
    this.node.status(opts);
  }

  setStatusSuccess(text = 'Success') {
    this.status({
      fill: 'green',
      shape: 'dot',
      text: `${text}`,
    });
  }

  setStatusSending(text = 'Sending') {
    this.status({
      fill: 'yellow',
      shape: 'dot',
      text: `${text}`,
    });
  }

  setStatusFailed(text = 'Failed') {
    this.status({
      fill: 'red',
      shape: 'ring',
      text: `${text}`,
    });
  }

  debug() {
    super.debug(...arguments);
  }

  get api() {
    return this.reach('nodeConfig.server.api');
  }

  reach(path) {
    return selectn(path, this);
  }

  getContextValue(location, property, message) {
    if (message && location === 'msg') {
      return this.RED.util.getMessageProperty(message, property);
    }

    const contextKey = this.RED.util.parseContextStore(property);
    return this.context()[location].get(contextKey.key, contextKey.store);
  }
}

const _internals = {

  parseInputMessage(inputConfig, msg) {
    if (!inputConfig) return;
    const parsedResult = {};

    Object.keys(inputConfig).forEach((fieldKey)=> {
      // skip if server
      if (fieldKey === 'server') return;
      const fieldConfig = selectn(fieldKey, this.options.input);

      // If input not found then skip to the next input
      if (fieldConfig == null) throw 'Validation Config Not Found For: ' + fieldKey;

      // Check there is a message prop
      if (fieldConfig.messageProp == null) throw 'No Message prop For: ' + fieldKey;

      // Try to load from message
      const result = {
        key: fieldKey,
        value: selectn(fieldConfig.messageProp, msg),
      };

      // Check there is a config prop
      if (fieldConfig.configProp == null) throw 'No Config prop For: ' + fieldKey;

      // If message missing value and node has config that can be used instead
      if (result.value === undefined && fieldConfig.configProp) {
        // clone nodeConfig so that we don't modify an object more than once
        try {
          result.value = JSON.parse(JSON.stringify(selectn(fieldConfig.configProp, this.nodeConfig)));
        } catch (error) {
          this.setStatusFailed('Error');
          this.error(fieldConfig.configProp, error);
          return;
        }
      }

      // If schema for value is present run validation,
      // throwing on failed validation
      if (fieldConfig.schema) {
        result.value = validateEntity(this, result.key, result.value, fieldConfig);
      }

      // Validate children
      if (result.value instanceof Object) {
        validateChildren(this, result.value);
      }

      // If value not found or empty then skip
      if (result.value === undefined || result.value === '' || result.value === null || (result.value instanceof Object && Object.keys(result.value).length === 0)) return;

      // Assign result to config key value
      parsedResult[fieldKey] = result.value;
    });

    return parsedResult;
  },
};

function validateEntity(node, fieldKey, fieldValue, config) {
  // If its an XRP address then check its format/validity
  if ((fieldKey === 'address' && fieldValue !== '') || fieldKey === 'account' || fieldKey === 'ownerAddress' ||
  (fieldKey === 'destination' && !(fieldValue instanceof Object) ) ) {
    if (!XRPLib.isValidAddress(fieldValue)) {
      node.setStatusFailed('Invalid XRP address');
      throw 'Invalid XRP Address: ' + fieldKey;
    }
  }

  // convert value if required
  if (config.convert) {
    fieldValue = config.convert(fieldValue);
  }

  // Validate the value against the schema
  if (config.schema) {
    const {error, value} = Joi.validate(
        fieldValue,
        config.schema
    );

    if (error) throw error;
    return value;
  } else {
    return fieldValue;
  }
}

function validateChildren(node, parent) {
  Object.keys(parent).forEach((key)=> {
    // If value not found or empty then remove from parent
    if (parent[key] === undefined || parent[key] === '' || parent[key] === null) {
      delete parent[key];
      return;
    }
    // validate child value against schema
    if (DefaultOptions.InputOptions.input[key] !== undefined) {
      parent[key] = validateEntity(node, key, parent[key], DefaultOptions.InputOptions.input[key]);
    }

    // if child value is another object then check those too
    if (parent[key] instanceof Object) {
      if (Array.isArray(parent[key])) {
        parent[key].forEach((child)=>{
          validateChildren(node, child);
        });
      } else validateChildren(node, parent[key]);
    }

    // If value is date coonvert back to string after checking valid
    if (parent[key] instanceof Date) {
      parent[key] = parent[key].toISOString();
    }

    // If value is of date is default then remove
    if (parent[key] == '0000-00-00T00:00:00.000Z') {
      delete parent[key];
      return;
    }

    // If value not found or empty then remove from parent
    if (parent[key] instanceof Object && Object.keys(parent[key]).length === 0) {
      delete parent[key];
      return;
    }
  });
}

const _eventHandlers = {
  preOnInput(message) {
    try {
      const parsedMessage = _internals.parseInputMessage.call(
          this,
          this.options.config,
          message
      );

      this.onInput({
        parsedMessage,
        message,
      });
    } catch (e) {
      if (e && e.isJoi) {
        this.inError = true;
        this.setStatusFailed('Error');
        this.node.warn(e.message);
        return this.send(null);
      }
      throw e;
    }
  },

  async preOnClose(removed, done) {
    this.debug(
        `closing node. Reason: ${
        removed ? 'node deleted' : 'node re-deployed'
        }`
    );
    try {
      await this.onClose(removed);
      done();
    } catch (e) {
      this.error(e.message);
    }
  },
};

module.exports = BaseNode;
