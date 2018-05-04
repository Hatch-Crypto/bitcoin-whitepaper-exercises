# Bitcoin Whitepaper Exercises - Proof of Work

In this exercise, we're going back to the simplicity of the first exercise; we're just adding a piece of text (a line from the poem) to a block, no transactions or signatures or inputs/outputs or any of that complication.

Instead, this exercise focuses on a simple implementation of the "Proof of Work" consensus algorithm -- the goal of which being to make it "difficult" / "not worth it" for a malicious person to recompute all the hashes in an entire chain just so they can rewrite a bit of history.

To implement Proof of Work, we're going to keep trying to compute a hash for a block until the hash is "lower" than a certain threshold, as defined by an incrementing `difficulty` integer. This `difficulty` value represents the required number of leading (on the left) `0`'s in the **binary representation** of the hash -- not the normal hexadecimal represtation where each character represents 4 bits. The more leading `0`'s there are, the lower that hash value is.

To get a new hash each time you compute, you need to change the data in the block. For this reason, blocks need a `nonce` field added, which is simply a random number. Each time you generate a new `nonce`, recompute the hash and compare (with `hashIsLowEnough(..)`) to see if it's low enough to be accepted for the current `difficulty`.

There are different ways of comparing a hash value's binary bit representation to see if it's low enough. Here are some hints to get you started:

* You don't need to compare the whole hash, only the first X hexadecimal digits (characters) of it from the left, depending on how many bits the `difficulty` value implies. Remember, 4 bits is one hexadecimal digit character.

* You can create a number value from a string representing its binary bits like this: `Number("0b001011011")`, which produces the number value `91`.

* `difficulty` means how many leading `0`'s must be present when representing a hash's left-most characters in binary. You may do this comparison based on string characters or numeric values (of either binary or base-10 form), whichever seems best to you. But, make sure you compare values in the same kind of representation/base.

* JavaScript now supports a `padStart(..)` utility for strings, which may be useful here.
