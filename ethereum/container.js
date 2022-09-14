import web3 from "./web3";
import Input from './build/Input.json';

const instance = new web3.eth.Contract(
    JSON.parse(Input.interface),
    '0x5A6D591540aB3D6616b1954C992f07Cf969f2a20'
);

export default instance;