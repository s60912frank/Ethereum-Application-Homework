const fs = require('fs')
const Web3 = require('web3')

async function main() {
    let web3 = new Web3('http://localhost:8545')

    const abi = JSON.parse(fs.readFileSync('../contract/Bank_sol_Bank.abi').toString())
    const contract_address = fs.readFileSync('../address.txt').toString()
    let bank = new web3.eth.Contract(abi, contract_address)

    let arg = {
        from: process.argv[2] || 0,
        to: process.argv[3] || 1,
        amount: process.argv[4] || 1
    }
    
    // accounts[0] transfer 1 * 10**18 coins to accounts[2]
    try {
        const accounts = await web3.eth.getAccounts()
        let result = await bank.methods.transferCoin(accounts[arg.to], arg.amount).send({ from: accounts[arg.from]})
        console.log("Tx hash: " + result.transactionHash)
    } catch (error) {
        console.log(error)
    }
}

main()
