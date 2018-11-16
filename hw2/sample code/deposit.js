const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('../contract/Bank_sol_Bank.abi').toString())
const address = fs.readFileSync('../address.txt').toString()

let bank = new web3.eth.Contract(abi, address)

let arg = {
    acc_num: process.argv[2] || 0,
    amount: process.argv[3] || '3'
}

web3.eth.getAccounts().then(function (accounts) {

    // accounts[0] deposit 3 ether
    bank.methods.deposit().send({
        from: accounts[arg.acc_num],
        gas: 3400000,
        value: web3.utils.toWei(arg.amount, 'ether')
    })
        .on('receipt', console.log)
        .on('error', console.error)

})
