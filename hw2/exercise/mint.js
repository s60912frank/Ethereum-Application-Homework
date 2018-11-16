const fs = require('fs')
const Web3 = require('web3')

async function main() {
    let web3 = new Web3('http://localhost:8545')

    const abi = JSON.parse(fs.readFileSync('../contract/Bank_sol_Bank.abi').toString())
    const contract_address = fs.readFileSync('../address.txt').toString()
    let bank = new web3.eth.Contract(abi, contract_address)

    let minter = process.argv[2] || 0
    
    // accounts[0] mint 3 * 10**18 coins
    // your code
    try {
        const account_address = (await web3.eth.getAccounts())[minter]
        let result = await bank.methods.mint(3).send({ from: account_address})
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

main()