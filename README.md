From:
https://www.youtube.com/watch?v=VH9Q2lf2mNo&ab_channel=DappUniversity

FOR RUNNING IT:
you have to have Ganache opened
install metamask chrome extension with 2 accounts imported from ganache
truffle migrate
npm run start

Introduction to Blockchain development with ethereum and smartcontracts

Useful commands:
compile SC : truffle compile

migrate SC to the blockchain: truffle migrate ( we have to create new file in migrations filder)

access the blockchain console: turffle console

get the current accounts: web3.eth.getAccounts

get the current block number: web3.eth.getBlockNumber()

get the logs of a method (transaction):
var result = marketplace.createProduct();
console.log(result.logs);

msg.sender = the one who calls the function

Deploy contract on blockchain (Kovan test network)

1.https://ethdrop.dev/ - faucet of eth; 2. https://remix.ethereum.org/ - compile and deploy ( view transaction details on etherscan)
3.create a new entry iin Marketplace.json, under "networks" key with:
<<42 = the network id for kovan>>
"42": {
"events": {},
"links": {},
"address": "0x46edffd3135823f80928dbd6445419a03f9dba6e",
"transactionHash": "0x18eac71dd4b2a093e886d14a1b035cb0b3027287e85903b3f0657e72b968527b"
} 4. refresh the app
