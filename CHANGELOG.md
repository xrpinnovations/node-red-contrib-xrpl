# Change Log

All notable changes to this project will be documented in this file.

## [0.2.1] 2017-04-07

### Changed
- nodes/get-server.js - Bugfix on subscribe list generating account malformed error on empty subscription

## [0.2.0] 2017-03-07

### Notes
- Big Release, all nodes rebased to inherit from a base node sharing common features and code
- Additional nodes and XRPL functionality added
- Validation checks included additional to RippleLib validation checks
- Standardised error checking
- Node status inclusion
- Bug fixes

### Added
- lib/base-node.js
- lib/default_options.js
- nodes/combine-signatures.html
- nodes/combine-signatures.js
- nodes/get-information.html
- nodes/get-information.js
- nodes/prepare-order.html
- nodes/prepare-order.js
- nodes/prepare-order-cancellation.html
- nodes/prepare-order-cancellation.js
- nodes/prepare-payment-channel-claim.html
- nodes/prepare-payment-channel-claim.js
- nodes/prepare-payment-channel-create.html
- nodes/prepare-payment-channel-create.js
- nodes/prepare-payment-channel-fund.html
- nodes/prepare-payment-channel-fund.js
- nodes/prepare-payment.html
- nodes/prepare-payment.js
- nodes/prepare-settings.html
- nodes/prepare-settings.js
- nodes/prepare-trustline.html
- nodes/prepare-trustline.js
- nodes/sign-payment-channel-claim.html
- nodes/sign-payment-channel-claim.js
- nodes/verify-payment-channel-claim.html
- nodes/verify-payment-channel-claim.js

### Changed
- lib/xrp.js - Too many to list
- examples/Offline Sign Tool.json - Updated to work with new nodes & included as part of node-red import features.
- nodes/check-valid-address.html - standardised descriptions
- nodes/check-valid-address.js - standardised with base node, validation checks
- nodes/generate-account-with-mnemonic.html - standardised descriptions
- nodes/generate-account-with-mnemonic.js - standardised with base node, validation checks
- nodes/generate-account-with-secret.html - standardised descriptions
- nodes/generate-account-with-secret.js - standardised with base node, validation checks
- nodes/generate-qrcode.html - standardised descriptions
- nodes/generate-qrcode.js - standardised with base node, validation checks
- nodes/get-information.html - standardised descriptions
- nodes/get-information.js - standardised with base node, validation checks
- nodes/get-server.html - standardised descriptions, included optional servers, mulitple subscribe addresses supported
- nodes/get-server.js - validation checks, included optional servers, mulitple subcribe addresses supported
- nodes/prepare-escrow-cancellation.html - standardised descriptions
- nodes/prepare-escrow-cancellation.js - standardised with base node, validation checks
- nodes/prepare-escrow-creation.html - standardised descriptions
- nodes/prepare-escrow-creation.js - standardised with base node, validation checks
- nodes/prepare-escrow-execution.html - standardised descriptions
- nodes/prepare-escrow-execution.js - standardised with base node, validation checks
- nodes/prepare-transaction.html - standardised descriptions
- nodes/prepare-transaction.js - standardised with base node, validation checks
- nodes/receive-transaction.html - standardised descriptions, mulitple addresses supported
- nodes/receive-transaction.js - standardised with base node, validation checks, mulitple addresses supported
- nodes/send-xrp.html - standardised descriptions
- nodes/send-xrp.js - standardised with base node, validation checks
- nodes/sign-transaction.html - standardised descriptions
- nodes/sign-transaction.js - standardised with base node, validation checks
- nodes/submit-signed-transaction.html - standardised descriptions
- nodes/submit-signed-transaction.js - standardised with base node, validation checks

### Removed
- nodes/get-account-transactions.html - removed in favour of get-information generic node
- nodes/get-account-transactions.js - removed in favour of get-information generic node
- nodes/get-account.html - removed in favour of get-information generic node
- nodes/get-account.js - removed in favour of get-information generic node
- nodes/get-transaction.html - removed in favour of get-information generic node
- nodes/get-transaction.js - removed in favour of get-information generic node


## [0.1.4]

### Added

- **offline_sign_tool.json** Included example flow

## [0.1.3]

### Changed

- **generate-qrcode.js** Improved scanning efficiency
