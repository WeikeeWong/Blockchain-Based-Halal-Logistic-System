import React, { Component} from 'react';
import { Button, Menu, Table, Dropdown, Form, Select, Grid , Cell, Item} from 'semantic-ui-react';
import Input from '../../ethereum/container';
import RequestShow from '../../components/RequestShow';
import Layout from '../../components/Layout';
import { Link } from '../../routes';

var data= [
    {cID:'', HalStatus:'', Booked:'', SDate:'', EDate:'', Product:'', Quantity:''}
];

var temp;

class showCont extends Component{

    static async getInitialProps(){
     
        const contCount = await Input.methods.getContainerCount().call();

        const container = await Promise.all(
            Array(parseInt(contCount)).fill().map((element, index) => {
                return Input.methods.container(index).call()
            })
        );
        return {container, contCount};

    }
      
    renderShow(){
        
        temp =  []
        for (var i = 0; i < data.length; i++){
            if (data[i][0].Booked){
                temp.push(data[i])
            };
        }  
        
        return temp.map((temp, index) => {
            return (
                <RequestShow
                    id={index}
                    cID={temp[0].cID}
                    HalStatus={temp[0].HalStatus}
                    Booked={temp[0].Booked}
                    SDate={temp[0].SDate}
                    EDate={temp[0].EDate}
                    Product={temp[0].Product}
                    Quantity={temp[0].Quantity}
                />
            );
        });
        
      }

      getContainerInfo(){
         return this.props.container.find((request, index) => {
            {this.renderTable(request, index)}
         });
    
     }

    renderTable(request, i){

        data[i] = [
            {cID:request._ContainerNo, HalStatus:request._HalalStatus, Booked:request._booked, SDate:request._StartDate, EDate:request._EndDate, Product:request._ProductName, Quantity:request._Quantity}
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
            <h3 align="center" style={{color:'#ffffff', fontWeight:'bold'}} >Container Details</h3>
            <div style={{marginLeft:'80px', marginRight:'80px'}}>
                <div style={{color:'#ffffff', fontWeight:'bold'}}>
                <Menu style={{ marginTop: '50px ', marginLeft:'80px', marginRight:'80px', backgroundColor:'#D3D3D3'}}>

                <Link route="/shows/showAll">
                    <a className="item" style={{fontWeight:'bold'}}>All Records</a>
                </Link>

                <Menu.Menu position="right">

                    <Link route="/shows/showAvailable">
                        <a className="item" style={{ fontWeight:'bold'}}>Available</a>
                    </Link>
                    <Link route="/shows/showNotAvailable">
                        <a className="item" style={{ fontWeight:'bold'}}>Not Available</a>
                    </Link>
                    <Link route="/shows/showDestroy">
                        <a className="item" style={{ fontWeight:'bold'}}>Destroy</a>
                    </Link>
    

                </Menu.Menu>          
                </Menu>
                </div>
                    
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Container ID</HeaderCell>
                        <HeaderCell>Halal status</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                        <HeaderCell>Start Date</HeaderCell>
                        <HeaderCell>End Date</HeaderCell>
                        <HeaderCell>Product Name</HeaderCell>
                        <HeaderCell>Quantity</HeaderCell>
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

 
