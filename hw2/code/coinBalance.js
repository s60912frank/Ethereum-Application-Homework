const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('../contract/Bank_sol_Bank.abi').toString())
const address = fs.readFileSync('../address.txt').toString()

let bank = new web3.eth.Contract(abi, address)
let acc_num = process.argv[2] || 0

web3.eth.getAccounts().then(function (accounts) {

    // get ether in bank
    bank.methods.getCoinBalance().call({
        from: accounts[acc_num]
    })
        .then((balance) => { console.log(balance) })

})