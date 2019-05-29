/*
File:               xrp.js
Author:             Gazos <gazos@xrpi.io>
Date:               02/04/19
Last Modified Date: 28/05/19
Last Modified By:   Gazos <gazos@xrpi.io>
*/

// Import Dependencies
const RippleAPI = require('ripple-lib').RippleAPI;
const ripple = require('ripple-keypairs')
const bip39 = require('bip39');
const bip32 = require('ripple-bip32');

/*
  xrpToDrops: Converts an XRP amount to drops. 1 XRP = 1,000,000 drops, so 1 drop = 0.000001 XRP. This method is useful when converting amounts for use with the rippled API, which requires XRP amounts to be specified in drops.
  xrp: A string or BigNumber representing an amount of XRP. If xrp is a string, it may start with -, must contain at least one number, and may contain up to one .. This method throws a ValidationError for invalid input
  URL https://developers.ripple.com/rippleapi-reference.html#xrptodrops
*/
function xrpToDrops(xrp){
  var api = new RippleAPI();
  return api.xrpToDrops(xrp);
}

/*
  dropsToXrp: Converts an XRP amount to drops. 1 XRP = 1,000,000 drops, so 1 drop = 0.000001 XRP. This method is useful when converting amounts for use with the rippled API, which requires XRP amounts to be specified in drops.
  xrp: Converts an amount of drops to XRP. 1 drop = 0.000001 XRP, so 1 XRP = 1,000,000 drops. This method is useful when converting amounts from the rippled API, which describes XRP amounts in drops
  URL https://developers.ripple.com/rippleapi-reference.html#dropstoxrp
*/
function dropsToXrp(drops){
  var api = new RippleAPI();
  return api.dropsToXrp(xrp);
}

/*
  xrpTimeToUTC: checks whether the adress validates as base58 encoding with a xrp characterset.
  utcSeconds: UTC Seconds to convert to date
*/
function xrpTimeToUTC(utcSeconds){
  //946684800 since xrp epoch
  var d = new Date(946684800);
  return d.setUTCSeconds(utcSeconds);
}

/*
  iso8601ToXRPTime: This method parses a string representation of a date, and returns the number of seconds since the "Ripple Epoch" of January 1, 2000 (00:00 UTC).
  iso8601Date: A string representing a date and time. This string is parsed using JavaScript's Date.parse() method
  URL https://developers.ripple.com/rippleapi-reference.html#iso8601torippletime
*/
function iso8601ToXRPTime(iso8601Date){
    var api = new RippleAPI();
  return api.iso8601ToRippleTime(iso8601Date);
}

/*
  isValidAddress: checks whether the adress validates as base58 encoding with a xrp characterset.
  address: An address to check
  URL https://developers.ripple.com/rippleapi-reference.html#isvalidaddress
*/
function isValidAddress(address) {
  var api = new RippleAPI();
  return api.isValidAddress(address);
}

/*
  isValidSecret: checks whether the secret is valid.
  secret: A secret to check
  URL https://developers.ripple.com/rippleapi-reference.html#isvalidsecret
*/
function isValidSecret(secret) {
  var api = new RippleAPI();
  return api.isValidSecret(secret);
}

/*
  getAccount: Gets a summary of the XRP account.
  server: Livenet/Testnet server selected.
  address: The address of the account to get the account info of.
  URL: https://developers.ripple.com/rippleapi-reference.html#getaccountinfo
  TODO OPTIONS
*/
function getAccount(server, address) {
  var api = server.getApi();

  if (isValidAddress(address)){
    return api.getAccountInfo(address);
  }
}

/*
  getAccountTransactions: Retrieves transactions for a particular XRP address
  server: Livenet/Testnet server selected.
  address: The address of the account to get transactions for.
  URL: https://developers.ripple.com/rippleapi-reference.html#gettransactions
  TODO Options
*/
function getAccountTransactions(server, address) {

  var api = server.getApi();

  if (isValidAddress(address)){
    return api.getTransactions(address, { earliestFirst: false }).then(transactions => {
      return transactions;
    }).catch((error) => {
      return {errorType: "Get Transactions", error: error};
    });
  }
}

/*
  prepareTransaction: Prepares a new transaction ready to be signed.
  server: Livenet/Testnet server selected.
  transaction: The specification (JSON) of the transaction to prepare. Set Account to the address of the account that is creating the transaction. You may omit auto-fillable fields like Fee, Flags, and Sequence to have them set automatically.
  instruction: Optional Instructions for executing the transaction
  URL: https://developers.ripple.com/rippleapi-reference.html#preparetransaction
*/
function prepareTransaction(server, transaction, instruction) {

  var api = server.getApi();

  return api.prepareTransaction(transaction, instruction)
  .then((preparedTx) => {
    return preparedTx;
  }).catch((error) => {
      return {errorType: "Prepare Transaction", error: error};
  });
}

/*
  prepareEscrowCreation: Prepares a new escrow ready to be signed.
  server: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction.
  escrowCreation: The specification of the escrow creation to prepare.
  instructions: Optional Instructions for executing the transaction
  URL: https://developers.ripple.com/rippleapi-reference.html#prepareescrowcreation
*/
function prepareEscrowCreation(server, address, escrowCreation, instructions) {

  var api = server.getApi();

  return api.prepareEscrowCreation(address, escrowCreation, instructions)
  .then((preparedTx) => {
    return preparedTx;
  }).catch((error) => {
      return {errorType: "Prepare Escrow Creation", error: error};
  });
}

/*
  prepareEscrowExecution: Prepare an escrow execution transaction. The prepared transaction must subsequently be signed and submitted
  server: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction
  escrowExecution: The specification of the escrow execution to prepare.
  instructions: Optional Instructions for executing the transaction
  URL: https://developers.ripple.com/rippleapi-reference.html#prepareescrowexecution
*/
function prepareEscrowExecution(server, address, escrowExecution, instructions) {

  var api = server.getApi();

  return api.prepareEscrowExecution(address, escrowExecution, instructions)
  .then((preparedTx) => {
    return preparedTx;
  }).catch((error) => {
      return {errorType: "Prepare Escrow Execution", error: error};
  });
}

/*
  prepareEscrowCancellation: Prepare an escrow cancellation transaction. The prepared transaction must subsequently be signed and submitted.
  server: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction
  escrowCancellation: The specification of the escrow cancellation to prepare
  instructions: Optional Instructions for executing the transaction
  URL: https://developers.ripple.com/rippleapi-reference.html#prepareescrowcancellation
*/
function prepareEscrowCancellation(server, address, escrowCancellation, instructions) {

  var api = server.getApi();

  return api.prepareEscrowCancellation(address, escrowCancellation, instructions)
  .then((preparedTx) => {
    return preparedTx;
  }).catch((error) => {
      return {errorType: "Prepare Escrow Cancellation", error: error};
  });
}

/*
  preparePayment: Prepare an escrow cancellation transaction. The prepared transaction must subsequently be signed and submitted.
  server: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction
  escrowCancellation: The specification of the escrow cancellation to prepare
  instructions: Optional Instructions for executing the transaction
  URL: https://developers.ripple.com/rippleapi-reference.html#prepareescrowcancellation
*/
// function preparePayment(server, sender, destination, tag, amount) {
//
//   var api = server.getApi();
//
//   return api.preparePayment(sender,
//     {
//       "source": {
//         "address": sender,
//         "maxAmount": {
//           "currency": "drops",
//           "value": api.xrpToDrops(amount)
//         }
//       },
//       "destination": {
//         "address": destination,
//         "amount": {
//           "currency": "drops",
//           "value": api.xrpToDrops(amount)
//         },
//         "tag": tag
//       }
//     },{
//       // Expire this transaction if it doesn't execute within ~5 minutes:
//       "maxLedgerVersionOffset": 75
//     }).then((preparedTx) => {
//       return preparedTx.txJSON;
//   }).catch((e) => {
//       return {error: e};
//   });
// }

/*
  signTransaction: Sign a prepared transaction. The signed transaction must subsequently be submitted
  txJSON: Transaction represented as a JSON string in rippled format.
  secret: Optional The secret of the account that is initiating the transaction. (This field is exclusive with keypair).
  URL: https://developers.ripple.com/rippleapi-reference.html#sign
  TODO OPTIONS & KEPAIRS
*/
function signTransaction(txJSON, secret) {
  var api = new RippleAPI(); // set the api to offline
  return api.sign(txJSON, secret);
}

/*
  submitSignedTransaction: Submits a signed transaction. The transaction is not guaranteed to succeed; it must be verified with getTransaction
  signedTransaction: A signed transaction as returned by sign
  URL: https://developers.ripple.com/rippleapi-reference.html#submit
*/
function submitSignedTransaction(server, signedTransaction) {
  var api = server.getApi();
  return api.submit(signedTransaction).then((result) => {
    return result;
  }).catch((error) => {
      return {errorType: "Submit Signed Transaction", error: error}
  });
}

/*
  getTransaction: Retrieves a transaction by its Transaction ID
  server: Livenet/Testnet server selected.
  id: A hash of a transaction used to identify the transaction, represented in hexadecimal.
  URL: https://developers.ripple.com/rippleapi-reference.html#gettransaction
  TODO OPTIONS
*/
function getTransaction(server, id) {

  var api = server.getApi();

  return api.getTransaction(id).then(transaction => {
    return transaction;
  }).catch((error) => {
      return {errorType: "Get Transaction", error: error}
  });
}

/*
  generateAccountWithMnemonic: Creates a new XRP 24 word Mnemonic account.
  TODO OPTIONS
*/
function generateAccountWithMnemonic(mnemonic) {

  if (typeof mnemonic !== 'string')
    mnemonic = bip39.generateMnemonic(256); //Generate 24 word list

  return bip39.mnemonicToSeed(mnemonic).then((s) =>{
    return bip32.fromSeedBuffer(s);
  }).then((m) => {
    const keypair = m.derivePath("m/44'/144'/0'/0/0").keyPair.getKeyPairs();
    const address = ripple.deriveAddress(keypair.publicKey);

    return {mnemonic: mnemonic, keypair: keypair, address: address};
  }).catch((error) => {
      return {errorType: "Generate Mnemonic", error: error}
  });

}
/*
  generateAccoutWithSecret: Derive XRP account from secret (family seed).
  TODO OPTIONS
*/
function generateAccoutWithSecret(secret) {
  if (typeof secret !== 'string')
    secret = ripple.generateSeed();
  const keypair = ripple.deriveKeypair(secret);
  const address = ripple.deriveAddress(keypair.publicKey);

  return {secret: secret, keypair: keypair, address: address};
}

module.exports = {isValidAddress, isValidSecret, xrpToDrops, dropsToXrp, iso8601ToXRPTime, xrpTimeToUTC, getAccount, getAccountTransactions, prepareTransaction, signTransaction, submitSignedTransaction, getTransaction, generateAccountWithMnemonic, generateAccoutWithSecret, prepareEscrowCreation, prepareEscrowExecution, prepareEscrowCancellation};
