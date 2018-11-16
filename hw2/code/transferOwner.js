const fs = require('fs')
const Web3 = require('web3')

async function main() {
    let web3 = new Web3('http://localhost:8545')

    const abi = JSON.parse(fs.readFileSync('../contract/Bank_sol_Bank.abi').toString())
    const contract_address = fs.readFileSync('../address.txt').toString()
    let bank = new web3.eth.Contract(abi, contract_address)

    let arg = {
        old_owner: process.argv[2] || 0,
        new_owner: process.argv[3] || 1
    }
    
    // accounts[0] transferOwner to accounts[1]
    try {
        const accounts = await web3.eth.getAccounts()
        let result = await bank.methods.transferOwner(accounts[arg.new_owner]).send({ from: accounts[arg.old_owner]})
        console.log("Tx hash: " + result.transactionHash)
    } catch (error) {
        console.log(error)
    }
}

main()
