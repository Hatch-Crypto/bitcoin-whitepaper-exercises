"use strict";

var path = require("path");
var fs = require("fs");
var crypto = require("crypto");
var openpgp = require("openpgp");

var myChain = {
	blocks: [],
};

// Genesis block
myChain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});


Object.assign(module.exports,{
	chain: myChain,

	createBlock,
	insertBlock,
	createTransaction,
	authorizeInput,
	verifyChain,
});


// **********************************

function createBlock(data) {
	var bl = {
		index: myChain.blocks.length,
		prevHash: myChain.blocks[myChain.blocks.length-1].hash,
		data,
		timestamp: Date.now(),
	};

	bl.hash = blockHash(bl);

	return bl;
}

function insertBlock(bl) {
	myChain.blocks.push(bl);
}

function createTransaction(data) {
	var tr = {
		data,
	};

	tr.hash = transactionHash(tr);

	return tr;
}

async function authorizeInput(input,privKey) {
	input.signature = await createSignature(input.account,privKey);
	return input;
}

function transactionHash(tr) {
	return crypto.createHash("sha256").update(
		`${JSON.stringify(tr.data)}`
	).digest("hex");
}

async function verifyTransaction(tr) {
	if (tr.data == null) return false;
	if (!Array.isArray(tr.data.inputs)) return false;
	if (!Array.isArray(tr.data.outputs)) return false;

	for (let input of tr.data.inputs) {
		if (!(await verifySignature(input.signature,input.account))) {
			return false;
		}
	}

	return true;
}

async function createSignature(text,privKey) {
	var privKeyObj = openpgp.key.readArmored(privKey).keys[0];

	var options = {
		data: text,
		privateKeys: [privKeyObj],
	};

	return (await openpgp.sign(options)).data;
}

async function verifySignature(signature,pubKey) {
	try {
		let pubKeyObj = openpgp.key.readArmored(pubKey).keys[0];

		let options = {
			message: openpgp.cleartext.readArmored(signature),
			publicKeys: pubKeyObj,
		};

		return (await openpgp.verify(options)).signatures[0].valid;
	}
	catch (err) {}

	return false;
}

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		`${bl.index};${bl.prevHash};${JSON.stringify(bl.data)};${bl.timestamp}`
	).digest("hex");
}

async function verifyBlock(bl) {
	if (bl.data == null) return false;
	if (bl.index === 0) {
		if (bl.hash !== "000000") return false;
	}
	else {
		if (!bl.prevHash) return false;
		if (!(
			typeof bl.index === "number" &&
			Number.isInteger(bl.index) &&
			bl.index > 0
		)) {
			return false;
		}
		if (bl.hash !== blockHash(bl)) return false;
		if (!Array.isArray(bl.data)) return false;

		for (let tr of bl.data) {
			if (!(await verifyTransaction(tr))) return false;
		}
	}

	return true;
}

async function verifyChain(chain) {
	var prevHash;
	for (let bl of chain.blocks) {
		if (prevHash && bl.prevHash !== prevHash) return false;
		if (!(await verifyBlock(bl))) return false;
		prevHash = bl.hash;
	}

	return true;
}
