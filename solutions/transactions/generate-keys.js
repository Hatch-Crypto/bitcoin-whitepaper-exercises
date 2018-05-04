"use strict";

var path = require("path");
var fs = require("fs");
var openpgp = require("openpgp");

const KEYS_DIR = path.join(__dirname,"keys");

var options = {
	userIds: [{ name: "Bitcoin Whitepaper", email: "bitcoin@whitepaper.tld" }],
	numBits: 2048,
	passphrase: "",
};

openpgp.generateKey(options).then(function onGenerated(key) {
	try { fs.mkdirSync(KEYS_DIR); } catch (err) {}

	fs.writeFileSync(path.join(KEYS_DIR,"priv.pgp.key"),key.privateKeyArmored,"utf8");
	fs.writeFileSync(path.join(KEYS_DIR,"pub.pgp.key"),key.publicKeyArmored,"utf8");

	console.log("Keypair generated.");
});
