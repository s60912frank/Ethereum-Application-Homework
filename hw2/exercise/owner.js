const fs = require('fs')
const Web3 = require('web3')

async function main() {
    let web3 = new Web3('http://localhost:8545')

    const abi = JSON.parse(fs.readFileSync('../contract/Bank_sol_Bank.abi').toString())
    const contract_address = fs.readFileSync('../address.txt').toString()
    let bank = new web3.eth.Contract(abi, contract_address)
    
    // get contract owner
    try {
        let result = await bank.methods.getOwner().call()
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

main()