import React, { Component } from 'react';
import { Card, Form, Button, Table } from 'semantic-ui-react';
import Input from '../../ethereum/container';
import RequestCont from '../../components/RequestCont';
import Layout from '../../components/Layout';


class DetailsCont extends Component {
    static async getInitialProps(){

        const contCount = await Input.methods.getContainerCount().call();
       
        const container = await Promise.all(
            Array(parseInt(contCount)).fill().map((element, index) => {
                return Input.methods.container(index).call()
            })
        );

        return {container};

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
            </Layout>
            </div>
        );
    }
      
}


export default DetailsCont;