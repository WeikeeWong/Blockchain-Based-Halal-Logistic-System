import React, { Component } from 'react';
import { Card, Form, Button, Table } from 'semantic-ui-react';
import Input from '../../ethereum/container';
import RequestRow from '../../components/RequestRow';
import Layout from '../../components/Layout';



class DetailsWa extends Component {
    static async getInitialProps(){
     
        const warehouseCount = await Input.methods.getWarehouseCount().call();

        const warehouse = await Promise.all(
            Array(parseInt(warehouseCount)).fill().map((element, index) => {
                return Input.methods.warehouse(index).call()
            })
        );

        return {warehouse};

    }

    renderRows(){
        return this.props.warehouse.map((request, index) => {
            return (
                <RequestRow
                    id={index}
                    request={request}
                />
            );
        });
    }


    render(){

        const { Header, Row, HeaderCell, Body} = Table;

        return(
            <div style={{ backgroundImage:"url('https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg')", 
            backgroundSize: 'cover',
            height:'100vh'
            }}>
        <Layout>

            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
            <span></span>
            <h3 align="center" style={{color:'#ffffff', fontWeight:'bold'}} >Warehouse Details</h3>
            <div style={{marginLeft:'80px', marginRight:'80px'}}>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Warehouse ID</HeaderCell>
                        <HeaderCell>Warehouse Size</HeaderCell>
                        <HeaderCell>Warehouse Address</HeaderCell>
                        <HeaderCell>Area Code</HeaderCell>
                        <HeaderCell>Product Name</HeaderCell>
                        <HeaderCell>Quantity</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                    </Row>
                </Header>
                <Body>{this.renderRows()}</Body>
            </Table>
            </div>
            </Layout>
            </div>
        );
    }
      
}


export default DetailsWa;