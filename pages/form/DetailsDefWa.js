import React, { Component } from 'react';
import { Card, Form, Button, Table } from 'semantic-ui-react';
import Input from '../../ethereum/container';
import RequestRowDefWa from '../../components/RequestRowDefWa';
import Layout from '../../components/Layout';



class DetailsDefWa extends Component {
    static async getInitialProps(){

        const defwaCount = await Input.methods.getdefWarehouseCount().call();

        const defwarehouse = await Promise.all(
            Array(parseInt(defwaCount)).fill().map((element, index) => {
                return Input.methods.defwarehouse(index).call()
            })
        );

        return {defwarehouse};

    }

    renderRowDefWa(){
        return this.props.defwarehouse.map((request, index) => {
            return (
                <RequestRowDefWa
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
            <span> </span>
            <h3 align="center" style={{color:'#ffffff', fontWeight:'bold'}} >Defined Warehouse Details</h3>
            <div style={{marginLeft:'80px', marginRight:'80px'}}>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Warehouse ID</HeaderCell>
                        <HeaderCell>Warehouse Address</HeaderCell>
                        <HeaderCell>Warehouse Size</HeaderCell>
                        <HeaderCell>Area Code</HeaderCell>
                        <HeaderCell>Halal Status</HeaderCell>
                    </Row>
                </Header>
                <Body>{this.renderRowDefWa()}</Body>
            </Table>
            </div>
            </Layout>
            </div>
        );
    }
      
}


export default DetailsDefWa;