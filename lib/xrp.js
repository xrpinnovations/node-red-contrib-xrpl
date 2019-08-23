/*
  File:               xrp.js
  Author:             Gazos <gazos@xrpi.io>
  Date:               02/04/19
  Last Modified Date: 30/06/19
  Last Modified By:   Gazos <gazos@xrpi.io>
*/

// Import Dependencies
const RippleAPI = require('ripple-lib').RippleAPI;
const ripple = require('ripple-keypairs');
const bip39 = require('bip39');
const bip32 = require('ripple-bip32');

/*
  xrpToDrops: Converts an XRP amount to drops. 1 XRP = 1,000,000 drops, so 1 drop = 0.000001 XRP. This method is useful when converting amounts for use with the rippled API, which requires XRP amounts to be specified in drops.
  xrp: A string or BigNumber representing an amount of XRP. If xrp is a string, it may start with -, must contain at least one number, and may contain up to one .. This method throws a ValidationError for invalid input
  URL https://xrpl.org/rippleapi-reference.html#xrptodrops
*/
function xrpToDrops(xrp) {
  const api = new RippleAPI();
  return api.xrpToDrops(xrp);
}

/*
  dropsToXrp: Converts an XRP amount to drops. 1 XRP = 1,000,000 drops, so 1 drop = 0.000001 XRP. This method is useful when converting amounts for use with the rippled API, which requires XRP amounts to be specified in drops.
  xrp: Converts an amount of drops to XRP. 1 drop = 0.000001 XRP, so 1 XRP = 1,000,000 drops. This method is useful when converting amounts from the rippled API, which describes XRP amounts in drops
  URL https://xrpl.org/rippleapi-reference.html#dropstoxrp
*/
function dropsToXrp(drops) {
  const api = new RippleAPI();
  return api.dropsToXrp(drops);
}

/*
  xrpTimeToUTC: checks whether the adress validates as base58 encoding with a xrp characterset.
  utcSeconds: UTC Seconds to convert to date
*/
function xrpTimeToUTC(utcSeconds) {
  // 946684800 since xrp epoch
  const d = new Date(946684800);
  return d.setUTCSeconds(utcSeconds);
}

/*
  iso8601ToXRPTime: This method parses a string representation of a date, and returns the number of seconds since the "Ripple Epoch" of January 1, 2000 (00:00 UTC).
  iso8601Date: A string representing a date and time. This string is parsed using JavaScript's Date.parse() method
  URL https://xrpl.org/rippleapi-reference.html#iso8601torippletime
*/
function iso8601ToXRPTime(iso8601Date) {
  const api = new RippleAPI();
  return api.iso8601ToRippleTime(iso8601Date);
}

/*
  isValidAddress: checks whether the adress validates as base58 encoding with a xrp characterset.
  address: An address to check
  URL https://xrpl.org/rippleapi-reference.html#isvalidaddress
*/
function isValidAddress(address) {
  const api = new RippleAPI();
  return api.isValidAddress(address);
}

/*
  isValidSecret: checks whether the secret is valid.
  secret: A secret to check
  URL https://xrpl.org/rippleapi-reference.html#isvalidsecret
*/
function isValidSecret(secret) {
  const api = new RippleAPI();
  return api.isValidSecret(secret);
}

/*
  getAccountInformation: Retrieve accoutn realted information.
  api: Livenet/Testnet server selected.
  address: The address of the account to get the account info for.
  selection: Type of information to retrieve.
  options: options relating to individual api request.
*/
function getAccountInformation(api, address, selection, options, orderBook) {
  switch (selection) {
    /*
      getTransactions: Retrieves historical transactions of an account.
      address: The address of the account to get the info for.
      options: Optional Options.
      URL: https://xrpl.org/rippleapi-reference.html#gettransactions
    */
    case 'transactions':
      return api.getTransactions(address, options).catch((error) => {
        throw error;
      });
      break;
    /*
      getTrustlines: Returns trustlines for a specified account.
      address: The address of the account to get the info for.
      options: Optional Options.
      URL: https://xrpl.org/rippleapi-reference.html#gettrustlines
    */
    case 'trustlines':
      return api.getTrustlines(address).catch((error) => {
        throw error;
      });
      break;
    /*
      getBalances: Returns balances for a specified account.
      address: The address of the account to get the info for.
      options: Optional Options.
      URL: https://xrpl.org/rippleapi-reference.html#getbalances
    */
    case 'balances':
      return api.getBalances(address, options).catch((error) => {
        throw error;
      });
      break;
    /*
      getBalanceSheet: Returns aggregate balances by currency plus a breakdown of assets and obligations for a specified account.
      address: The address of the account to get the info for.
      options: Optional Options.
      URL: https://xrpl.org/rippleapi-reference.html#getbalancesheet
    */
    case 'balanceSheet':
      return api.getBalanceSheet(address, options).catch((error) => {
        throw error;
      });
      break;
    /*
      getOrders: Returns open orders for the specified account. Open orders are orders that have not yet been fully executed and are still in the order book.
      address: The address of the account to get the info for.
      options: Optional Options.
      URL: https://xrpl.org/rippleapi-reference.html#getorders
    */
    case 'orders':
      return api.getOrders(address, options).catch((error) => {
        throw error;
      });
      break;
    /*
      getOrders: Returns open orders for the specified account. Open orders are orders that have not yet been fully executed and are still in the order book.
      address: The address of the account to get the info for.
      orderBook: The order book to get.
      options: Optional Options.
      URL: https://xrpl.org/rippleapi-reference.html#getorderbook
    */
    case 'orderBook':
      return api.getOrderBook(address, orderBook, options).catch((error) => {
        throw error;
      });
      break;
    /*
      getSettings: Returns settings for the specified account. Note: For account data that is not modifiable by the user, see getAccountInfo.
      address: The address of the account to get the info for.
      options: Optional Options.
      URL: https://xrpl.org/rippleapi-reference.html#getsettings
    */
    case 'settings':
      return api.getSettings(address, options).catch((error) => {
        throw error;
      });
      break;
    /*
      getAccountInfo: Returns information for the specified account. Note: For account data that is modifiable by the user, see getSettings.
      address: The address of the account to get the info for.
      options: Optional Options.
      URL: https://xrpl.org/rippleapi-reference.html#getaccountinfo
    */
    case 'accountInfo':
      return api.getAccountInfo(address, options).catch((error) => {
        throw error;
      });
      break;
    /*
      getAccountObjects: Returns objects owned by an account. For an account's trust lines and balances, see getTrustlines and getBalances.
      address: The address of the account to get the info for.
      options: Optional Options.
      URL: https://xrpl.org/rippleapi-reference.html#getaccountobjects
    */
    case 'accountObjects':
      return api.getAccountObjects(address, options).catch((error) => {
        throw error;
      });
      break;
    default:
      break;
  }
}

function getLedgerInformation(api, selection, id, options, pathfind) {
  switch (selection) {
    /*
      getServerInfo: Get status information about the server that the RippleAPI instance is connected to.
      URL: https://xrpl.org/rippleapi-reference.html#getserverinfo
    */
    case 'serverInfo':
      return api.getServerInfo().catch((error) => {
        throw error;
      });
      break;
    /*
      getFee: Returns the estimated transaction fee for the rippled server the RippleAPI instance is connected to.
      URL: https://xrpl.org/rippleapi-reference.html#getfee
    */
    case 'fee':
      return api.getFee().catch((error) => {
        throw error;
      });
      break;
    /*
      getLederVersion: Returns the most recent validated ledger version number known to the connected server.
      URL: https://xrpl.org/rippleapi-reference.html#getledgerversion
    */
    case 'ledgerVersion':
      return api.getLedgerVersion().catch((error) => {
        throw error;
      });
      break;
    /*
      getTransaction: Retrieves a transaction by its Transaction ID.
      id: Transaction ID to lookup
      options: Optional values to tailor the lookup
      URL: https://xrpl.org/rippleapi-reference.html#gettransaction
    */
    case 'transaction':
      return getTransaction(api, id, options);
      break;
    /*
      getPaths: Finds paths to send a payment. Paths are options for how to route a payment.
      pathfind: Specification of a pathfind request
      URL: https://xrpl.org/rippleapi-reference.html#getpaths
    */
    case 'paths':
      return api.getPaths(pathfind).catch((error) => {
        throw error;
      });
      break;
    /*
      getPaymentChannel: Returns specified payment channel.
      id: 256-bit hexadecimal channel identifier
      URL: https://xrpl.org/rippleapi-reference.html#getpaymentchannel
    */
    case 'paymentChannel':
      return api.getPaymentChannel(id).catch((error) => {
        throw error;
      });
      break;
    /*
      getLedger: Returns header information for the specified ledger (or the most recent validated ledger if no ledger is specified). Optionally, all the transactions that were validated in the ledger or the account state information can be returned with the ledger header.
      options: Optional Options affecting what ledger and how much data to return
      URL: https://xrpl.org/rippleapi-reference.html#getoptions
    */
    case 'ledger':
      return api.getLedger(options).catch((error) => {
        throw error;
      });
      break;
    default:
      break;
  }
}

/*
      parseAccountFlags: Parse an AccountRoot object's Flags
      number: This method takes one parameter, the AccountRoot Flags number to parse. Note that flags have different mappings on other types of objects or in transactions such as AccountSet..
      URL: https://xrpl.org/rippleapi-reference.html#parseaccountflags
    */
function parseAccountFlags(number) {
  const api = new RippleAPI();
  return api.parseAccountFlags(number);
}

/*
  prepareTransaction: Prepares a new transaction ready to be signed.
  api: Livenet/Testnet server selected.
  transaction: The specification (JSON) of the transaction to prepare. Set Account to the address of the account that is creating the transaction. You may omit auto-fillable fields like Fee, Flags, and Sequence to have them set automatically.
  instruction: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#preparetransaction
*/
function prepareTransaction(api, transaction, instruction) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.prepareTransaction(transaction, instruction)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  prepareSettings: Prepares a new setting ready to be signed.
  api: Livenet/Testnet server selected.
  settings: The specification (JSON) of the setting to prepare. Set Account to the address of the account that is creating the transaction. You may omit auto-fillable fields like Fee, Flags, and Sequence to have them set automatically.
  instruction: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#preparesettings
*/
function prepareSettings(api, address, settings, instruction) {
  if (api == null) {
    api = new RippleAPI();
  }
  if (settings.regularKey == 'CLEAR') settings.regularKey = null;
  if (settings.emailhash == 'CLEAR') settings.emailHash = null;
  if (settings.transferRate == 'CLEAR') settings.transferRate = null;
  return api.prepareSettings(address, settings, instruction)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  preparePayment: Prepares a new payment transaction ready to be signed.
  api: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction.
  payment: The specification of the payment transaction.
  instructions: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#preparepayment
*/
function preparePayment(api, address, payment, instructions) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.preparePayment(address, payment, instructions)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  prepareOrder: Prepares a new order transaction ready to be signed.
  api: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction.
  order: The specification of the order transaction.
  instructions: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#prepareorder
*/
function prepareOrder(api, address, order, instructions) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.prepareOrder(address, order, instructions)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  prepareOrderCancellation: Prepares a new orderCancellation transaction ready to be signed.
  api: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction.
  orderCancellation: The specification of the orderCancellation transaction.
  instructions: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#prepareordercancellation
*/
function prepareOrderCancellation(api, address, orderCancellation, instructions) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.prepareOrderCancellation(address, orderCancellation, instructions)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  prepareTrustline: Prepares a new trustline transaction ready to be signed.
  api: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction.
  trustline: The specification of the trustline transaction.
  instructions: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#preparetrustline
*/
function prepareTrustline(api, address, trustline, instructions) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.prepareTrustline(address, trustline, instructions)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  prepareEscrowCreation: Prepares a new escrow ready to be signed.
  api: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction.
  escrowCreation: The specification of the escrow creation to prepare.
  instructions: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#prepareescrowcreation
*/
function prepareEscrowCreation(api, address, escrowCreation, instructions) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.prepareEscrowCreation(address, escrowCreation, instructions)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  prepareEscrowExecution: Prepare an escrow execution transaction. The prepared transaction must subsequently be signed and submitted
  api: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction
  escrowExecution: The specification of the escrow execution to prepare.
  instructions: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#prepareescrowexecution
*/
function prepareEscrowExecution(api, address, escrowExecution, instructions) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.prepareEscrowExecution(address, escrowExecution, instructions)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  prepareEscrowCancellation: Prepare an escrow cancellation transaction. The prepared transaction must subsequently be signed and submitted.
  api: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction
  escrowCancellation: The specification of the escrow cancellation to prepare
  instructions: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#prepareescrowcancellation
*/
function prepareEscrowCancellation(api, address, escrowCancellation, instructions) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.prepareEscrowCancellation(address, escrowCancellation, instructions)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  TESTNET ONLY
  prepareCheckCreate: Prepare a check create transaction. The prepared transaction must subsequently be signed and submitted.
  api: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction
  checkCreate: The specification of the check create to prepare
  instructions: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#preparecheckcreate
*/
function prepareCheckCreate(api, address, checkCreate, instructions) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.prepareCheckCreate(address, checkCreate, instructions)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  TESTNET ONLY
  prepareCheckCancel: Prepare a check cancel transaction. The prepared transaction must subsequently be signed and submitted.
  api: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction
  checkCancel: The specification of the check cancel to prepare
  instructions: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#preparecheckcancel
*/
function prepareCheckCancel(api, address, checkCancel, instructions) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.prepareCheckCancel(address, checkCancel, instructions)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  TESTNET ONLY
  prepareCheckCash: Prepare a check cash transaction. The prepared transaction must subsequently be signed and submitted.
  api: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction
  checkCash: The specification of the check cash to prepare
  instructions: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#preparecheckcash
*/
function prepareCheckCash(api, address, checkCash, instructions) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.prepareCheckCash(address, checkCash, instructions)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  preparePaymentChannelCreate: Prepare a payment channel create transaction. The prepared transaction must subsequently be signed and submitted.
  api: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction
  preparePaymentChannelCreate: The specification of the payment channel create to prepare
  instructions: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#preparepaymentchannelcreate
*/
function preparePaymentChannelCreate(api, address, preparePaymentChannelCreate, instructions) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.preparePaymentChannelCreate(address, preparePaymentChannelCreate, instructions)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  preparePaymentChannelFund: Prepare a payment channel fund transaction. The prepared transaction must subsequently be signed and submitted.
  api: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction
  preparePaymentChannelFund: The specification of the payment channel fund to prepare
  instructions: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#preparepaymentchannelfund
*/
function preparePaymentChannelFund(api, address, preparePaymentChannelFund, instructions) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.preparePaymentChannelFund(address, preparePaymentChannelFund, instructions)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  preparePaymentChannelClaim: Prepare a payment channel claim transaction. The prepared transaction must subsequently be signed and submitted.
  api: Livenet/Testnet server selected.
  address: The address of the account that is creating the transaction
  preparePaymentChannelClaim: The specification of the payment channel claim to prepare
  instructions: Optional Instructions for executing the transaction
  URL: https://xrpl.org/rippleapi-reference.html#preparepaymentchannelclaim
*/
function preparePaymentChannelClaim(api, address, preparePaymentChannelClaim, instructions) {
  if (api == null) {
    api = new RippleAPI();
  }
  return api.preparePaymentChannelClaim(address, preparePaymentChannelClaim, instructions)
      .then((preparedTx) => {
        return {txJSON: JSON.parse(preparedTx.txJSON), instructions: preparedTx.instructions};
      }).catch((error) => {
        throw error;
      });
}

/*
  signPaymentChannelClaim: Sign a payment channel claim. The signature can be submitted in a subsequent PaymentChannelClaim transaction
  URL: https://xrpl.org/rippleapi-reference.html#signPaymentChannelClaim
*/
function signPaymentChannelClaim(signPaymentChannelClaim) {
  const api = new RippleAPI(); // set the api to offline
  return api.signPaymentChannelClaim(signPaymentChannelClaim.channel,
      signPaymentChannelClaim.amount, signPaymentChannelClaim.privateKey);
}

/*
  verifyPaymentChannelClaim: Verify a payment channel claim signature
  URL: https://xrpl.org/rippleapi-reference.html#verifyPaymentChannelClaim
*/
function verifyPaymentChannelClaim(verifyPaymentChannelClaim) {
  const api = new RippleAPI(); // set the api to offline
  return api.verifyPaymentChannelClaim(verifyPaymentChannelClaim.channel,
      verifyPaymentChannelClaim.amount, verifyPaymentChannelClaim.signature,
      verifyPaymentChannelClaim.publicKey);
}

/*
  combineSignatures: Combines signed transactions from multiple accounts for a multisignature transaction. The signed transaction must subsequently be submitted
  signedTransactions: An array of transactions to be combined
  URL: https://xrpl.org/rippleapi-reference.html#combine
*/
function combineSignatures(signedTransactions) {
  const api = new RippleAPI(); // set the api to offline
  return api.combine(signedTransactions);
}

/*
  signTransaction: Sign a prepared transaction. The signed transaction must subsequently be submitted
  txJSON: Transaction represented as a JSON string in rippled format.
  credentials: Either the secret or keypair used to sign the transaction
  signAs: used to sign the transaction on behalf of another account. Multi Signature
  URL: https://xrpl.org/rippleapi-reference.html#sign
*/
function signTransaction(txJSON, credentials, signAs) {
  const api = new RippleAPI(); // set the api to offline
  return api.sign(txJSON, credentials, {signAs: signAs});
}

/*
  submitSignedTransaction: Submits a signed transaction. The transaction is not guaranteed to succeed; it must be verified with getTransaction
  signedTransaction: A signed transaction as returned by sign
  URL: https://xrpl.org/rippleapi-reference.html#submit
*/
function submitSignedTransaction(api, signedTransaction) {
  return api.submit(signedTransaction).then((result) => {
    return result;
  }).catch((error) => {
    throw error;
  });
}

/*
  getTransaction: Retrieves a transaction by its Transaction ID
  api: Livenet/Testnet server selected.
  id: A hash of a transaction used to identify the transaction, represented in hexadecimal.
  URL: https://xrpl.org/rippleapi-reference.html#gettransaction
  TODO OPTIONS
*/
function getTransaction(api, id, options) {
  return api.getTransaction(id, options).then((transaction) => {
    return transaction;
  }).catch((error) => {
    throw error;
  });
}

/*
  generateAccountWithMnemonic: Creates a new XRP 24 word Mnemonic account.
  TODO OPTIONS
*/
function generateAccountWithMnemonic(mnemonic) {
  if (typeof mnemonic !== 'string') {
    mnemonic = bip39.generateMnemonic(256);
  } // Generate 24 word list

  return bip39.mnemonicToSeed(mnemonic).then((s) =>{
    return bip32.fromSeedBuffer(s);
  }).then((m) => {
    const keypair = m.derivePath('m/44\'/144\'/0\'/0/0').keyPair.getKeyPairs();
    const address = ripple.deriveAddress(keypair.publicKey);

    return {mnemonic: mnemonic, keypair: keypair, address: address};
  }).catch((error) => {
    const throwError = 'Generate Mnemonic' + error;
    throw throwError;
  });
}
/*
  generateAccoutWithSecret: Derive XRP account from secret (family seed).
  TODO OPTIONS
*/
function generateAccoutWithSecret(secret) {
  if (typeof secret !== 'string') {
    secret = ripple.generateSeed();
  }
  const keypair = ripple.deriveKeypair(secret);
  const address = ripple.deriveAddress(keypair.publicKey);

  return {secret: secret, keypair: keypair, address: address};
}

module.exports = {
  isValidAddress,
  isValidSecret,
  xrpToDrops,
  dropsToXrp,
  iso8601ToXRPTime,
  xrpTimeToUTC,

  generateAccountWithMnemonic,
  generateAccoutWithSecret,

  getAccountInformation,
  getLedgerInformation,
  parseAccountFlags,
  getTransaction,

  prepareTransaction,
  preparePayment,
  prepareSettings,

  prepareOrder,
  prepareOrderCancellation,

  prepareTrustline,

  prepareEscrowCreation,
  prepareEscrowExecution,
  prepareEscrowCancellation,

  prepareCheckCreate,
  prepareCheckCancel,
  prepareCheckCash,

  preparePaymentChannelCreate,
  preparePaymentChannelFund,
  preparePaymentChannelClaim,

  signPaymentChannelClaim,
  verifyPaymentChannelClaim,

  signTransaction,
  combineSignatures,
  submitSignedTransaction,
};
