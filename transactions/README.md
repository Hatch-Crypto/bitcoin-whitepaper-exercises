# Bitcoin Whitepaper Exercises - Transactions

Similar to the previous Hashing exercise, in this exercise you will add the 8 lines of text from the provided poem to a blockchain. But this time, you will add each one as a separate transaction, authorize the transaction with a key and signature, and then add all 8 transactions to a single block. Finally, you'll validate the blockchain, including all the transaction signatures.

## Setup

Run `npm install` in this exercise folder to install the dependencies listed in the included `package.json` file.

Run `node generate-keys.js` from the command-line to create the `keys/` sub-directory which includes a keypair to use for digital signatures.

## Part 1

Define a `createTransaction(..)` function that takes the text (line of a poem) and creates a transaction object. The transaction object should have a `data`. The transaction then needs a `hash` field with the value returned from `transactionHash(..)`.

Define an asynchronous `authorizeTransaction(..)` function which then adds to the transaction object, a `pubKey` field with the public key text (`PUB_KEY_TEXT`), and a `signature` field with the signature created by `await`ing a call to `createSignature(..)`.

In `addPoem()`, for each line of the poem, create and authorize a transaction object and store it in the `transactions` array. Then add set those transactions as the data for a new block, and insert the block into the blockchain.

## Part 2

Modify `verifyBlock(..)` to validate all the transactions in the `data` of a block. It may be useful to define a `verifyTransaction(..)` function.

Each transaction should be verified according to:

* `hash` should match what's computed with `transactionHash(..)`

* should include `pubKey` string and `signature` string fields

* the `signature` should verify correctly with `verifySignature(..)`

Print out verification that the blockchain is valid after having added all the poem text as transactions.
