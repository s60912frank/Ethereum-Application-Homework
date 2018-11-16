const fs = require('fs')
const Web3 = require('web3')

async function main() {
    let web3 = new Web3('http://localhost:8545')

    const abi = JSON.parse(fs.readFileSync('../contract/Bank_sol_Bank.abi').toString())
    const contract_address = fs.readFileSync('../address.txt').toString()
    let bank = new web3.eth.Contract(abi, contract_address)

    let arg = {
        from: process.argv[2] || 1,
        amount: process.argv[3] || 1
    }
    
    // accounts[1] buy 1 * 10**18 coins
    try {
        const account_address = (await web3.eth.getAccounts())[arg.from]
        let result = await bank.methods.buy(arg.amount).send({ from: account_address })
        console.log("Tx hash: " + result.transactionHash)
    } catch (error) {
        console.log(error)
    }
}

main()
