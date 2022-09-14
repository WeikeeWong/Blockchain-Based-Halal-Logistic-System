import web3 from "./web3";
import Input from './build/Input.json';


export default address => {
     return new web3.eth.Contract(JSON.parse(Input.interface), address);
};