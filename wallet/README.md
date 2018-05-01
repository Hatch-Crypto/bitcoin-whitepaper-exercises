# Bitcoin Whitepaper Exercises - Wallet

In this exercise, you will create and authorize transactions which "spend" money by transferring from one account to the other, and back. You will define a wallet that tracks two accounts, including `outputs` that determine each account's balances, and spend those `output`s as `input`s to the other account, and vice versa. One of the expenditures must be rejected for insufficient balance, and gracefully noted.

Finally, you will add all these transactions to the blockchain, verify the chain, and compute and print out the final balances after the transactions.

## Setup

Run `npm install` in this exercise folder to install the dependencies listed in the included `package.json` file.

Run `node generate-keys.js` from the command-line to create the `keys/` sub-directory which includes two keypairs, one for each account, to use for digital signatures.

## Part 1

Notice that `addAccount(..)` (which is called twice for you) creates two entries in our wallet, with each entry tracking the keypair for that account as well as its current list of valid `outputs` that represent all the funds available to that account to spend.

In addition to recording our transactions on the blockchain, this list of outputs, for each account, will be updated each time an expenditure is made.

Unlike the previous Transactions exercise, where all we added to a transaction object was `data` that was a string value (line of a poem), the `data` for a transaction will be an object that holds two arrays, `inputs` and `outputs`. Each element in these arrays will be an object that represents either the source (`inputs`) or target (`outputs`) of funds, as well as a signature to verify each input.

Modify `spend(..)` to create the transaction data as just described as an object, including verifying each input, then create that transaction, then insert it into a block.

The rules for spending dictate that we should sort the outputs we have in an account in greatest to least order, and spend the biggest ones first. For whatever amount we're spending, we need to add up enough `outputs` to equal or exceed that amount. Each of the selected `outputs` are recorded as `inputs` in the transaction data, and each of these should include a signature signed by the private key of the originating account.

If our total selected `outputs` (aka `inputs`) amounts exceeds the intended amount to spend, we'll need another `output` for this transaction that represents the change/refund back to the originating account for the difference. If we don't have enough `outputs` in an account for the amount we're spending, that should be noted as an error and the expenditure transaction should be aborted.

For example, if you have outputs of `5`, `10`, and `15`, and you want to spend `23`, you'd sort the list to `15`, `10`, and `5`, and thus `15` and `10` would be used. But since that exceeds `23`, you need to give "change" of `2` back as an `input` to the originating account (from whom these two `outputs` were selected).

## Part 2

Define `accountBalance(..)` to compute the total balance for an account in the wallet by adding up all its `outputs` amounts.

The notice that one of the expenditures was not possible because of lack of funds should be printed, along with the balances of both accounts. Finally, print out the result of calling `verifyChain(..)` to verify the state of the blockchain.
