// npm-library
const Wallet = require('ethereumjs-wallet');
const keccak256 = require('js-sha3').keccak256;

// keypair
const wallet = Wallet.generate();
// privKey
const privKey = wallet.getPrivateKey();
// pubKey
const pubKey = wallet.getPublicKey();

console.log("================== Question A ==================");
// private and public key in hex
console.log("privKey(hex)\n\t" + privKey.toString('hex'));
console.log("pubKey(hex)\n\t" + pubKey.toString('hex'));
// address
let address = wallet.getAddressString();
console.log("address\n\t" + address);

console.log("================== Question B ==================");
let public_key_hash = keccak256(pubKey);
console.log("public_key_hash(hex)\n\t" + public_key_hash);
// address = '0x' + last 20 bytes of public_key_hash
// one character in hex string is 4 bits
let _address = '0x' + public_key_hash.substr(public_key_hash.length - 40);
console.log("address('0x' + last 20 bytes of public_key_hash)\n\t" + _address);

console.log("================== Question C ==================");
const password = 'nccu';
let keystore = wallet.toV3(password);
console.log(keystore);

const imported_wallet = Wallet.fromV3(keystore, password);
const pk_from_keystore = imported_wallet.getPrivateKey();
console.log("privKey from keystore(hex)\n\t" + pk_from_keystore.toString('hex'));
console.log("Match?\n\t" + (pk_from_keystore.toString('hex') === privKey.toString('hex')));