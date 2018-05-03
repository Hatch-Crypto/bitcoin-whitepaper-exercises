# Bitcoin Whitepaper Exercises - Incentives

In this exercise, our focus is on the incentives we can use to motivate the time and resources spent running a blockchain node. We'll do this in a simple (greedy) way by implementing a selection algorithm for picking transactions to add to the blockchain that maximizes our payoff from transaction/block fees for each block we create.

## Setup

Run `npm install` in this exercise folder to install the dependencies listed in the included `package.json` file.

Run `node generate-keys.js` from the command-line to create the `keys/` sub-directory which includes a keypair. NOTE: we'll only use the public key for this exercise.

## Exercise

We'll create each line as a transaction, but instead of adding each transaction in order to the blockchain right away, we'll add the transactions to a "pool" (an array).

Define `addPoem(..)` to loop through the lines of the poem and create a new transaction for each, adding each transaction to the `transactionPool` array. Each transaction should include not only the `data` (the line of the poem) but also a randomly generated positive integer value between `1` and `10` to use for its transaction fee, as its `fee` field.

After the poem's lines have been created as transactions in the pool, we'll then process the entire pool by selecting several transactions at a time to add as a single block to the blockchain, and repeating until the pool is empty. Because our selection order will be dependent on the amounts of the transaction fees, the lines of the poem will likely not be added to the blockchain in their chronological order; that's perfectly OK for this exercise.

Define `processPool(..)` to select transactions from the pool in descending order of their `fee` value, pulling them out of the `transactionPool` array for adding to a new block. Each block's list of transactions should start with an object representing the block-fee to be paid for adding this transaction; this object should include a `blockFee` field equal to the amount in the `blockFee` constant, as well as an `account` field with the public key (`PUB_KEY_TEXT`).

The maximum number of transactions (including the block fee) for each block is specified by `maxBlockSize`, so make sure not to exceed that count.

Finally, define `countMyEarnings(..)` that traverses the whole blockchain -- skip the genesis block! -- and adds up all the block fees and transaction fees. Print out your total earnings. NOTE: since transaction fees are randomly generated, this value will change between each run of your program.

BONUS: inspect your blockchain to make sure you added all the transactions to blocks in descending order of their fee.
