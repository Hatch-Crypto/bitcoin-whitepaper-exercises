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

Promise.all([
	openpgp.generateKey(options),
	openpgp.generateKey(options),
])
.then(function onGenerated([key1,key2]) {
	try { fs.mkdirSync(KEYS_DIR); } catch (err) {}

	fs.writeFileSync(path.join(KEYS_DIR,"1.priv.pgp.key"),key1.privateKeyArmored,"utf8");
	fs.writeFileSync(path.join(KEYS_DIR,"1.pub.pgp.key"),key1.publicKeyArmored,"utf8");
	fs.writeFileSync(path.join(KEYS_DIR,"2.priv.pgp.key"),key2.privateKeyArmored,"utf8");
	fs.writeFileSync(path.join(KEYS_DIR,"2.pub.pgp.key"),key2.publicKeyArmored,"utf8");

	console.log("Two keypairs generated.");
});
