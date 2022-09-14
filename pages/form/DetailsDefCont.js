import React, { Component } from 'react';
import { Card, Form, Button, Table } from 'semantic-ui-react';
import Input from '../../ethereum/container';
import RequestDef from '../../components/RequestDef';
import Layout from '../../components/Layout';



class DetailsDefCont extends Component {
    static async getInitialProps(){
     
        const defCount = await Input.methods.getdefContainerCount().call();

        const defcontainer = await Promise.all(
            Array(parseInt(defCount)).fill().map((element, index) => {
                return Input.methods.defcontainer(index).call()
            })
        );

        return {defcontainer};

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
            </Layout>
            </div>
        );
    }
      
}


export default DetailsDefCont;