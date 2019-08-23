/*
File:               default_options.js
Author:             Gazos <gazos@xrpi.io>
Date:               04/06/19
Last Modified Date: 30/06/19
Last Modified By:   Gazos <gazos@xrpi.io>
*/

const Joi = require('@hapi/joi');
const XRPLib = require('../lib/xrp');

const InputOptions = {
  input: {
    topic: {messageProp: 'topic'},
    payload: {messageProp: 'payload'},
    server: {
      configProp: 'server',
    },
    payment: {
      messageProp: 'payload.payment',
      configProp: 'payment',
      schema: Joi
          .object()
          .required()
          .label('Payment'),
    },
    instructions: {
      messageProp: 'payload.instructions',
      configProp: 'instructions',
      schema: Joi
          .object()
          .label('Instructions'),
    },
    escrowCreation: {
      messageProp: 'payload.escrowCreation',
      configProp: 'escrowCreation',
      schema: Joi
          .object()
          .required()
          .label('escrowCreation'),
    },
    escrowCancellation: {
      messageProp: 'payload.escrowCancellation',
      configProp: 'escrowCancellation',
      schema: Joi
          .object()
          .required()
          .label('escrowCancellation'),
    },
    escrowExecution: {
      messageProp: 'payload.escrowExecution',
      configProp: 'escrowExecution',
      schema: Joi
          .object()
          .required()
          .label('escrowExecution'),
    },
    order: {
      messageProp: 'payload.order',
      configProp: 'order',
      schema: Joi
          .object()
          .required()
          .label('order'),
    },
    orderBook: {
      messageProp: 'payload.orderBook',
      configProp: 'orderBook',
      schema: Joi
          .object()
          .label('Order Book'),
    },
    orderCancellation: {
      messageProp: 'payload.orderCancellation',
      configProp: 'orderCancellation',
      schema: Joi
          .object()
          .required()
          .label('orderCancellation'),
    },
    trustline: {
      messageProp: 'payload.trustline',
      configProp: 'trustline',
      schema: Joi
          .object()
          .required()
          .label('trustline'),
    },
    settings: {
      messageProp: 'payload.settings',
      configProp: 'settings',
      schema: Joi
          .object()
          .required()
          .label('settings'),
    },
    checkCreate: {
      messageProp: 'payload.checkCreate',
      configProp: 'checkCreate',
      schema: Joi
          .object()
          .required()
          .label('checkCreate'),
    },
    checkCancel: {
      messageProp: 'payload.checkCancel',
      configProp: 'checkCancel',
      schema: Joi
          .object()
          .required()
          .label('checkCancel'),
    },
    checkCash: {
      messageProp: 'payload.checkCash',
      configProp: 'checkCash',
      schema: Joi
          .object()
          .required()
          .label('checkCash'),
    },
    paymentChannelCreate: {
      messageProp: 'payload.paymentChannelCreate',
      configProp: 'paymentChannelCreate',
      schema: Joi
          .object()
          .required()
          .label('paymentChannelCreate'),
    },
    paymentChannelFund: {
      messageProp: 'payload.paymentChannelFund',
      configProp: 'paymentChannelFund',
      schema: Joi
          .object()
          .required()
          .label('paymentChannelFund'),
    },
    paymentChannelClaim: {
      messageProp: 'payload.paymentChannelClaim',
      configProp: 'paymentChannelClaim',
      schema: Joi
          .object()
          .required()
          .label('paymentChannelClaim'),
    },
    address: {
      messageProp: 'payload.address',
      configProp: 'address',
      schema: Joi
          .string()
          .allow('')
          .label('Address'),
    },
    amount: {
      schema: Joi
          .any()
          .required()
          .label('Amount'),
    },
    destination: {
      schema: Joi
          .any()
          .required()
          .label('Destination'),
    },
    allowCancelAfter: {
      schema: Joi
          .date()
          .allow('0000-00-00T00:00:00.000Z')
          .iso()
          .label('AllowCancelAfter'),
    },
    allowExecuteAfter: {
      schema: Joi
          .date()
          .allow('0000-00-00T00:00:00.000Z')
          .iso()
          .label('AllowExecuteAfter'),
    },
    condition: {
      schema: Joi
          .string()
          .hex()
          .uppercase()
          .label('Condition'),
    },
    destinationTag: {
      schema: Joi
          .number()
          .label('DestinationTag'),
    },
    sourceTag: {
      schema: Joi
          .number()
          .label('SourceTag'),
    },
    fee: {
      convert: function(xrp) {
        return XRPLib.dropsToXrp(xrp);
      },
      schema: Joi
          .string()
          .regex(/^[0-9]+([.]+[0-9]+)?$/)
          .label('Fee'),
    },
    maxLedgerVersion: {
      schema: Joi
          .number()
          .label('MaxLedgerVersion'),
    },
    maxLedgerVersionOffset: {
      schema: Joi
          .number()
          .label('maxLedgerVersionOffset'),
    },
    sequence: {
      schema: Joi
          .number()
          .label('Sequence'),
    },
    signersCount: {
      schema: Joi
          .number()
          .label('SignersCount'),
    },
    memos: {
      schema: Joi
          .array()
          .label('Memos'),
    },
    uid: {
      messageProp: 'payload.uid',
      configProp: 'uid',
      schema: Joi
          .string()
          .allow('')
          .uppercase()
          .hex()
          .length(64)
          .label('ID'),
    },
    owner: {
      schema: Joi
          .string()
          .required()
          .label('Owner'),
    },
    escrowSequence: {
      schema: Joi
          .number()
          .label('Escrow Sequence'),
    },
    fulfillment: {
      schema: Joi
          .string()
          .hex()
          .uppercase()
          .label('Fulfillment'),
    },
    transaction: {
      schema: Joi
          .any()
          .required()
          .label('Transaction'),
    },
    tag: {
      schema: Joi
          .number()
          .label('Tag'),
    },
    allowPartialPayment: {
      schema: Joi
          .boolean()
          .label('Allow Partial Payment'),
    },
    invoiceID: {
      schema: Joi
          .string()
          .uppercase()
          .label('Invoice ID'),
    },
    limitQuality: {
      schema: Joi
          .boolean()
          .label('Limit Quality'),
    },
    limit: {
      schema: Joi
          .string()
          .label('Limit'),
    },
    authorized: {
      schema: Joi
          .boolean()
          .label('authorized'),
    },
    frozen: {
      schema: Joi
          .boolean()
          .label('frozen'),
    },
    qualityIn: {
      schema: Joi
          .number()
          .label('qualityIn'),
    },
    qualityOut: {
      schema: Joi
          .number()
          .label('quality Out'),
    },
    noDirectRipple: {
      schema: Joi
          .boolean()
          .label('No Direct Ripple'),
    },
    paths: {
      schema: Joi
          .string()
          .label('Paths'),
    },
    currency: {
      schema: Joi
          .string()
          .label('Currency'),
    },
    counterparty: {
      schema: Joi
          .string()
          .label('Counter Party'),
    },
    value: {
      schema: Joi
          .string()
          .regex(/^[0-9]+([.]+[0-9]+)?$/)
          .label('Value'),
    },
    txJSON: {
      messageProp: 'payload.txJSON',
      configProp: 'txJSON',
      schema: Joi
          .object()
          .required()
          .label('txJSON'),
    },
    signedTransaction: {
      messageProp: 'payload.signedTX.signedTransaction',
      configProp: 'signedTransaction',
      schema: Joi
          .string()
          .required()
          .label('signedTransaction'),
    },

    source: {
      schema: Joi
          .object()
          .label('Source'),
    },
    data: {
      messageProp: 'payload.data',
      configProp: 'data',
      schema: Joi
          .string()
          .label('Data'),
    },
    format: {
      schema: Joi
          .string()
          .label('Format'),
    },
    maxAmount: {
      schema: Joi
          .object()
          .label('maxAmount'),
    },
    minAmount: {
      schema: Joi
          .object()
          .label('minAmount'),
    },
    direction: {
      schema: Joi
          .string()
          .label('direction'),
    },
    quantity: {
      schema: Joi
          .object()
          .required()
          .label('quantity'),
    },
    totalPrice: {
      schema: Joi
          .object()
          .required()
          .label('totalPrice'),
    },
    expirationTime: {
      schema: Joi
          .date().iso()
          .allow('0000-00-00T00:00:00.000Z')
          .label('expirationTime'),
    },
    fillOrKill: {
      schema: Joi
          .boolean()
          .label('fillOrKill'),
    },
    immediateOrCancel: {
      schema: Joi
          .boolean()
          .label('immediateOrCancel'),
    },
    passive: {
      schema: Joi
          .boolean()
          .label('passive'),
    },
    orderToReplace: {
      schema: Joi
          .number()
          .label('orderToReplace'),
    },
    orderSequence: {
      schema: Joi
          .number()
          .required()
          .label('orderSequence'),
    },
    defaultRipple: {
      schema: Joi
          .boolean()
          .label('defaultRipple'),
    },
    depositAuth: {
      schema: Joi
          .boolean()
          .label('depositAuth'),
    },
    disableMasterKey: {
      schema: Joi
          .boolean()
          .label('disableMasterKey'),
    },
    disallowIncomingXRP: {
      schema: Joi
          .boolean()
          .label('disallowIncomingXRP'),
    },
    domain: {
      schema: Joi
          .string()
          .label('domain'),
    },
    emailHash: {
      allowEmtpy: true,
      schema: Joi
          .string()
          .label('emailHash'),
    },
    enableTransactionIDTracking: {
      schema: Joi
          .boolean()
          .label('enableTransactionIDTracking'),
    },
    globalFreeze: {
      schema: Joi
          .boolean()
          .label('globalFreeze'),
    },
    messageKey: {
      schema: Joi
          .string()
          .label('messageKey'),
    },
    noFreeze: {
      schema: Joi
          .boolean()
          .label('noFreeze'),
    },
    passwordSpent: {
      schema: Joi
          .boolean()
          .label('passwordSpent'),
    },
    regularKey: {
      allowEmtpy: true,
      schema: Joi
          .string()
          .label('messageKey'),
    },
    requireAuthorization: {
      schema: Joi
          .boolean()
          .label('requireAuthorization'),
    },
    requireDestinationTag: {
      schema: Joi
          .boolean()
          .label('requireDestinationTag'),
    },
    signers: {
      schema: Joi
          .object()
          .label('signers'),
    },
    threshold: {
      schema: Joi
          .number()
          .label('threshold'),
    },
    weights: {
      schema: Joi
          .array()
          .label('weights'),
    },
    weight: {
      schema: Joi
          .number()
          .label('weight'),
    },
    transferRate: {
      allowEmtpy: true,
      schema: Joi
          .number()
          .allow('CLEAR')
          .label('transferRate'),
    },
    sendMax: {
      schema: Joi
          .object()
          .label('sendMax'),
    },
    signers: {
      schema: Joi
          .object()
          .label('signers'),
    },
    expiration: {
      schema: Joi
          .date().iso()
          .allow('0000-00-00T00:00:00.000Z')
          .label('expiration'),
    },
    checkID: {
      schema: Joi
          .string()
          .label('checkID'),
    },
    deliverMin: {
      schema: Joi
          .object()
          .label('deliverMin'),
    },
    settleDelay: {
      schema: Joi
          .number()
          .label('settleDelay'),
    },
    publicKey: {
      schema: Joi
          .string()
          .label('publicKey'),
    },
    cancelAfter: {
      schema: Joi
          .date().iso()
          .allow('0000-00-00T00:00:00.000Z')
          .label('expiration'),
    },
    channel: {
      schema: Joi
          .string()
          .label('channel'),
    },
    balance: {
      schema: Joi
          .string()
          .regex(/^[0-9]+([.]+[0-9]+)?$/)
          .label('balance'),
    },
    close: {
      schema: Joi
          .boolean()
          .label('close'),
    },
    renew: {
      schema: Joi
          .boolean()
          .label('renew'),
    },
    ripplingDisabled: {
      schema: Joi
          .boolean()
          .label('ripplingDisabled'),
    },
    signature: {
      schema: Joi
          .string()
          .label('signature'),
    },
    validate: {
      messageProp: 'payload.validate',
      configProp: 'validate',
      schema: Joi
          .boolean()
          .label('validate'),
    },
    waitTime: {
      messageProp: 'payload.waitTime',
      configProp: 'waitTime',
      schema: Joi
          .number()
          .label('Wait Time'),
    },
    transaction: {
      messageProp: 'payload.transaction',
      configProp: 'transaction',
      schema: Joi
          .object()
          .label('transaction'),
    },
    options: {
      messageProp: 'payload.options',
      configProp: 'options',
      schema: Joi
          .object()
          .label('options'),
    },
    type: {
      schema: Joi
          .string()
          .label('Type'),
    },
    selection: {
      messageProp: 'payload.selection',
      configProp: 'selection',
      schema: Joi
          .string()
          .label('selection'),
    },
    selectionType: {
      messageProp: 'payload.selectionType',
      configProp: 'selectionType',
      schema: Joi
          .string()
          .label('selectionType'),
    },
    pathfind: {
      messageProp: 'payload.pathfind',
      configProp: 'pathfind',
      schema: Joi
          .object()
          .label('pathfind'),
    },
    signPaymentChannelClaim: {
      messageProp: 'payload.signPaymentChannelClaim',
      configProp: 'signPaymentChannelClaim',
      schema: Joi
          .object()
          .label('signPaymentChannelClaim'),
    },
    verifyPaymentChannelClaim: {
      messageProp: 'payload.verifyPaymentChannelClaim',
      configProp: 'verifyPaymentChannelClaim',
      schema: Joi
          .object()
          .label('verifyPaymentChannelClaim'),
    },
    publicKey: {
      schema: Joi
          .string()
          .label('publicKey'),
    },
    signedTransactions: {
      messageProp: 'payload.signedTransactions',
      configProp: 'signedTransactions',
      schema: Joi
          .array()
          .required()
          .label('signedTransactions'),
    },
    number: {
      messageProp: 'payload.number',
      configProp: 'number',
      schema: Joi
          .number()
          .allow('')
          .label('Number'),
    },
    signAs: {
      messageProp: 'payload.signAs',
      configProp: 'signAs',
      schema: Joi
          .string()
          .allow('')
          .label('signAs'),
    },
    monitor: {
      configProp: 'monitor',
      schema: Joi
          .array()
          .required()
          .label('monitor'),
    },
  },
};

module.exports = {InputOptions: InputOptions};
