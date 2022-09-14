# Blockchain Based Halal Logistic System

## Setup
1. Download the Metamask Extension from chrome
2. Set your wallet to Rinkeby test network
3. Get ETH from Rinkeby Faucet

## How to Run System
```
npm run dev
```

## Whenever there is a change in Solidity code, use these commands
```
cd ethereum
node compile.js
node deploy.js
```

## Smart Contract by using Solidity
```
pragma solidity ^0.4.17;
contract Input {

    struct defContainer{
        address ContainerAddr;
        string ContainerNo;
        string Description;
        string HalalStatus;
        string Supplier;
        uint Size;
    }

    struct defWarehouse{
        address WarehouseAddr;
        string WarehouseID;
        string WarehouseSize;
        string WarehouseAddress;
        string AreaCode;
        string HalalStatus;
    }

    struct Container{
        string _ContainerNo;
        string _HalalStatus;
        string _booked;
        string _StartDate;
        string _EndDate;
        string _ProductName;
        uint _Quantity;
        }

    struct Warehouse{
        string WarehouseID;
        string WarehouseSize;
        string AreaCode;
        string WarehouseAddress;
        string ProductName;
        string Quantity;
        string Status;
    }
    

    //0xAD6F6A2Abb8070C97f13C445ce08C9A59a64BAf6
    defContainer[] public defcontainer;
    defWarehouse[] public defwarehouse;
    Container[] public container;
    Warehouse[] public warehouse;

    address public issuingAuthority = 0xAD6F6A2Abb8070C97f13C445ce08C9A59a64BAf6;
    mapping(address => bool) registered;
    mapping(address => bool) public approvers;

    uint defcount=0;
    uint wadefcount=0;

    modifier issuingAuthorityOnly(){
        
        require(msg.sender == issuingAuthority);
        _;
        
    }

    function registerWarehouse (string WarehouseID, string WarehouseSize, string WarehouseAddress, string AreaCode, 
    string ProductName, string Quantity, string Status) public {
        
        Warehouse memory newWarehouse = Warehouse({
            WarehouseID: WarehouseID,
            WarehouseSize: WarehouseSize,
            WarehouseAddress: WarehouseAddress,
            AreaCode: AreaCode,
            ProductName: ProductName,
            Quantity: Quantity,
            Status: Status
        });
        
        warehouse.push(newWarehouse);
        
    }

   function registerContainer (string _ContainerNo, string _HalalStatus, string _booked, string _StartDate, string _EndDate, string _ProductName, uint _Quantity) public { 

        Container memory newContainer = Container({
            _ContainerNo: _ContainerNo,
            _HalalStatus: _HalalStatus,
            _booked: _booked,
            _StartDate: _StartDate,
            _EndDate: _EndDate,
            _ProductName: _ProductName,
            _Quantity: _Quantity

        });
        
        container.push(newContainer);
        
    }

    function defineContainer (string ContainerNo, string Description, string HalalStatus,string Supplier,uint Size) public{

        defContainer memory newDefine = defContainer({
            ContainerAddr: msg.sender,
            ContainerNo: ContainerNo,
            Description: Description,
            HalalStatus: HalalStatus,
            Supplier: Supplier,
            Size:Size
            
        });

        defcontainer.push(newDefine);
    
    }

    function defineWarehouse (string WarehouseID, string WarehouseSize, string WarehouseAddress, string AreaCode, string HalalStatus) public{

        defWarehouse memory newDefineWa = defWarehouse({
            WarehouseAddr: msg.sender,
            WarehouseID: WarehouseID,
            WarehouseAddress: WarehouseAddress,
            WarehouseSize: WarehouseSize,
            AreaCode: AreaCode,
            HalalStatus: HalalStatus
        });

        defwarehouse.push(newDefineWa);
    
    }
        

    function getdefContainerCount() public view returns (uint) {
        return defcontainer.length;
    }

    function getdefWarehouseCount() public view returns (uint) {
        return defwarehouse.length;
    }

    function getContainerCount() public view returns (uint){
        return container.length;
    }

    function getWarehouseCount() public view returns (uint) {
        return warehouse.length;
    }

}
```

## Compile Script
```
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const UserInputPath = path.resolve(__dirname, 'contracts', 'UserInput.sol');
const source = fs.readFileSync(UserInputPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'), output[contract]
    );
}
```

## Deploy Script
```
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
```

## After the smart contract has been delpoyed, the address need paste for web3
```
import web3 from "./web3";
import Input from './build/Input.json';

const instance = new web3.eth.Contract(
    JSON.parse(Input.interface),
    '0x5A6D591540aB3D6616b1954C992f07Cf969f2a20'
);

export default instance;
```

