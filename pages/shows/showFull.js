import React, { Component} from 'react';
import { Button, Menu, Table, Dropdown, Form, Select, Grid , Cell, Item} from 'semantic-ui-react';
import Input from '../../ethereum/container';
import RequestShowWa from '../../components/RequestShowWa';
import Layout from '../../components/Layout';
import { Link } from '../../routes';

var data= [
    {wID:'', Size:'', Code:'', Addr:'', Product:'', Quantity:'', Stat:''}
];

var temp;

class showCont extends Component{

    static async getInitialProps(){
     
        const waCount = await Input.methods.getWarehouseCount().call();

        const warehouse = await Promise.all(
            Array(parseInt(waCount)).fill().map((element, index) => {
                return Input.methods.warehouse(index).call()
            })
        );
        return {warehouse, waCount};

    }
      
    renderShow(){
        
        temp =  []
        for (var i = 0; i < data.length; i++){
            if (data[i][0].Stat == 'Full'){
                temp.push(data[i])
            };
        }  

        //{wID:'', Size:'', Code:'', Addr:'', Product:'', Quantity:'', Stat:''}
        
        return temp.map((temp, index) => {
            return (
                <RequestShowWa
                    id={index}
                    wID={temp[0].wID}
                    Size={temp[0].Size}
                    Code={temp[0].Code}
                    Addr={temp[0].Addr}
                    Product={temp[0].Product}
                    Quantity={temp[0].Quantity}
                    Stat={temp[0].Stat}
                />
            );
        });
        
      }

      getContainerInfo(){
         return this.props.warehouse.find((request, index) => {
            {this.renderTable(request, index)}
         });
    
     }

    renderTable(request, i){

        data[i] = [
            {wID:request.WarehouseID, Size:request.WarehouseSize, Code:request.AreaCode, Addr:request.WarehouseAddress, Product:request.ProductName, Quantity:request.Quantity, Stat:request.Status}
        ]
        temp = data
    }

    render(){

        const { Header, Row, HeaderCell, Body} = Table;

        return(
            <div style={{ backgroundImage:"url('https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg')", 
            height:'100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
        <Layout>

            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
            <span> </span>
            <h3 align="center" style={{color:'#ffffff', fontWeight:'bold'}} >Full Warehouse Details</h3>
            <div style={{marginLeft:'80px', marginRight:'80px'}}>
                <div style={{color:'#ffffff', fontWeight:'bold'}}>
                <Menu style={{ marginTop: '50px ', marginLeft:'80px', marginRight:'80px', backgroundColor:'#D3D3D3'}}>

                <Link route="/shows/showWa">
                    <a className="item" style={{fontWeight:'bold'}}>All Records</a>
                </Link>

                <Menu.Menu position="right">

                    <Link route="/shows/showFull">
                        <a className="item" style={{ fontWeight:'bold'}}>Full</a>
                    </Link>
                    <Link route="/shows/showNotFull">
                        <a className="item" style={{ fontWeight:'bold'}}>Not Full</a>
                    </Link>
                </Menu.Menu>          
                </Menu>
                </div>
                    
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Warehouse ID</HeaderCell>
                        <HeaderCell>Warehouse Size</HeaderCell>
                        <HeaderCell>Area Code</HeaderCell>
                        <HeaderCell>Address</HeaderCell>
                        <HeaderCell>Product</HeaderCell>
                        <HeaderCell>Quantity</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                    </Row>
                </Header>
                <Body>{this.getContainerInfo()}{this.renderShow()}</Body>
            </Table>
            </div>
            <br></br>
            </Layout>
            </div>
            
        );
    }
}

export default showCont;
