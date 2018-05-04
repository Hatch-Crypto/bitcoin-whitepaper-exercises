# Bitcoin Whitepaper Exercises - Hashing

In this exercise, you will practice writing code to create blocks, compute block hashes, and verify blocks based on those hashes.

## Part 1

You are provided lines of text from a poem, and you should loop through them and add each line as its own block of data to the provided blockchain.

Define a `createBlock(..)` function which takes the text for its data, creates an object for the block, and computes its hash, finally returning the block object. Insert this object into the `blocks` array for the blockchain.

Each block should have the following fields:

* `index`: an incrementing number that's the 0-based position of the new block within the `blocks` array; the genesis block has `index` of `0`, so the next block will have `index` of `1`, and so on

* `prevHash`: the value of the `hash` field from the last block in the `blocks` array

* `data`: the string value passed into `createBlock(..)`

* `timestamp`: the numeric timestamp (from `Date.now()`) of the moment the block is created

* `hash`: the SHA256 hash of the block's other fields (`index`, `prevHash`, `data`, and `timestamp`)

Verify that your blockchain includes all 8 lines of the poem, each as separate blocks, for a total of 9 blocks including the genesis block.

## Part 2

Define a `verifyChain(..)` function that checks all blocks in the chain to ensure the chain is valid, and returns `true` or `false` accordingly. It may be useful to define a `verifyBlock(..)` function that can be called for each block object.

Each block should be checked for the following:

* `data` must be non-empty
* for the genesis block only, the hash must be `"000000"`
* `prevHash` must be non-empty
* `index` must be an integer >= `0`
* the `hash` must match what recomputing the hash with `blockHash(..)` produces

In addition to verifying a block, the linkage between one block and its previous block must be checked, throughout the whole chain. That is, the block at position 4 needs to have a `prevHash` equal to the `hash` of the block at position `3`, and so on.

Print out verification that the blockchain is valid after having added all the poem text as blocks.
