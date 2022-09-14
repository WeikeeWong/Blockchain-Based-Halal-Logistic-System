import React, { Component } from 'react';
import { Button, Container, Form, Grid, Segment, Icon, Message, Divider} from 'semantic-ui-react';
import Input from '../../ethereum/container';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
import Link from 'next/link';

class showWarehouse extends Component {
static async getInitialProps(){
     
    const defwaCount = await Input.methods.getdefWarehouseCount().call();


    const defwarehouse = await Promise.all(
        Array(parseInt(defwaCount)).fill().map((element, index) => {
            return Input.methods.defwarehouse(index).call()
        })
    );

    return {defwarehouse, defwaCount};

}

renderDefWarehouse() {

    const {request} = this.props;

    return this.props.defwarehouse.map((request, index) => {

        for (var i = 0; i < this.props.defwaCount; i++) {
        
                return (
                    
                    <Form className='attached fluid segment'>

                    <h1></h1>    
                    <Grid centered color = 'blue'>
                    <Message
                        attached
                        header='Wallet Details'
                        color = 'blue'>
                    <h1>
                    {request.WarehouseID}'s Warehouse Details
                    </h1>
                    </Message>
                    </Grid>        
                    <div class="ui grid centered container" style={{marginTop:20}}>
                    <div class="row">

                     <div class="five wide column right floated" style={{marginTop:10}}>
                        <Container><img class = "ui image circular" src={`https://ipfs.io/ipfs/${request.UserHash}`} size='medium' circular></img></Container>
                    </div> 

                        <div class="eleven wide column" style={{color: 'black'}}>

                        
                        <p style={{marginTop:70}}>
                            <div class="ui horizontal segments" >
                        
                                <div class="ui black segment">
                                    <h3>Warehouse ID: {request.WarehouseID}</h3>
                                </div>
                            </div>
                            </p>

                            <p style={{marginTop:20}}>
                            <div class="ui horizontal segments">
                                
                                <div class="ui black segment">
                                    <h3>Size: {request.WarehouseSize}</h3>
                                </div>
                            </div>
                            </p>

                            
                            <p style={{marginTop:20}}>
                            <div class="ui horizontal segments">
                                <div class="ui black segment">
                                    <h3>Address: {request.WarehouseAddress}</h3>
                                </div>
                            </div>
                            </p>

                            <p style={{marginTop:20}}>
                            <div class="ui horizontal segments">
                                <div class="ui black segment">
                                    <h3>Phone Number: {request.AreaCode}</h3>
                                </div>
                            </div>


                            </p>

                            
                        </div> 
                    </div>
                </div>
                </Form>
                    
                );
        }
    });

}

render() {
        
    const {request} = this.props;
    //when make a react component, do have to return JSX from the render method
    //clurly braces for function call and reference javascript expression
    return (
        <Layout>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
            <div style={{ backgroundImage:"url('https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg')", 
            height:'100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            
            <h2 style={{color:'#ffffff', fontWeight:'bold'}}>Warehouse's Details<Icon name = "tablet"></Icon></h2>
            <h2></h2>
            <Message warning>
                <Message.Header>Alert!</Message.Header>
                <p >Create digital wallet only if wallet does not exist. (One wallet per account only)</p>
            </Message>

            {this.renderDefWarehouse()}
            
            </div>
        </Layout>
        
    );

}

}

export default showWarehouse;