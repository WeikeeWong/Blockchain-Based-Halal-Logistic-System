HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const input = require('./build/Input.json');


const provider = new HDWalletProvider(
    'gadget donor deposit afraid legend chef blanket off picture company pulse nation', 
    'https://rinkeby.infura.io/v3/fdddf5264ef048ca9b55d48e99b8879f'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(input.interface))
    .deploy({ data: input.bytecode})
    .send({ gas: '10000000', from: accounts[0] });

    console.log('Contract 1 deployed to', result.options.address);
};
deploy();


