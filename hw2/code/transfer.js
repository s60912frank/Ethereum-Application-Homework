const fs = require('fs')
const Web3 = require('web3')

let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('../contract/Bank_sol_Bank.abi').toString())
const address = fs.readFileSync('../address.txt').toString()

let bank = new web3.eth.Contract(abi, address)

let arg = {
    from: process.argv[2] || 0,
    to: process.argv[3] || 1,
    amount: process.argv[4] || 1
}

web3.eth.getAccounts().then(function (accounts) {

    // transfer 1 ether from accounts[0] to accounts[1]
    bank.methods.transfer(accounts[arg.to], arg.amount).send({
        from: accounts[arg.from],
        gas: 3400000
    })
        .on('receipt', (result) => console.log("Tx hash: " + result.transactionHash))
        .on('error', console.error)

})