import React, { Component } from 'react';
import { Card, Form, Button, Table } from 'semantic-ui-react';
import Input from '../../ethereum/container';
import RequestRow from '../../components/RequestRow';
import RequestDef from '../../components/RequestDef';
import RequestCont from '../../components/RequestCont';
import RequestRowDefWa from '../../components/RequestRowDefWa';
import Layout from '../../components/Layout';



class ReviewInfo extends Component {
    static async getInitialProps(){
     
        const warehouseCount = await Input.methods.getWarehouseCount().call();
        const defCount = await Input.methods.getdefContainerCount().call();
        const contCount = await Input.methods.getContainerCount().call();
        const waCount = await Input.methods.getContainerCount().call();
        const defwaCount = await Input.methods.getdefWarehouseCount().call();
       

        const warehouse = await Promise.all(
            Array(parseInt(warehouseCount)).fill().map((element, index) => {
                return Input.methods.warehouse(index).call()
            })
        );

        const defcontainer = await Promise.all(
            Array(parseInt(defCount)).fill().map((element, index) => {
                return Input.methods.defcontainer(index).call()
            })
        );

        const container = await Promise.all(
            Array(parseInt(contCount)).fill().map((element, index) => {
                return Input.methods.container(index).call()
            })
        );

        const defwarehouse = await Promise.all(
            Array(parseInt(defwaCount)).fill().map((element, index) => {
                return Input.methods.defwarehouse(index).call()
            })
        );

        return {defwarehouse,warehouse, defcontainer, container};

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

    renderRowsDef(){
        return this.props.defcontainer.map((request, index) => {
            return (
                <RequestDef
                    id={index}
                    request={request}
                />
            );
        });
    }

    renderRowsCont(){
        return this.props.container.map((request, index) => {
            return (
                <RequestCont
                    id={index}
                    request={request}
                />
            );
        });
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
            backgroundSize: 'cover'
            }}>
        <Layout>

            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
            <span> </span>

            <h3 align="center" style={{color:'#ffffff', fontWeight:'bold'}} >Defined Container Details</h3>
            <div style={{marginLeft:'80px', marginRight:'80px'}}>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Container ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Halal Status</HeaderCell>
                        <HeaderCell>Supplier</HeaderCell>
                        <HeaderCell>Size</HeaderCell>
                    </Row>
                </Header>
                <Body>{this.renderRowsDef()}</Body>
            </Table>
            </div>

            <span> </span>
            <h3 align="center" style={{color:'#ffffff', fontWeight:'bold'}} >Container Details</h3>
            <div style={{marginLeft:'80px', marginRight:'80px'}}>
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
                <Body>{this.renderRowsCont()}</Body>
            </Table>
            </div>

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


export default ReviewInfo;