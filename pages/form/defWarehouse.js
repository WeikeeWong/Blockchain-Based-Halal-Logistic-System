import React, { Component } from 'react';
import { Form, Button, Message, Select, Grid, Icon, Header } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import container from '../../ethereum/container';
import web3 from '../../ethereum/web3';
import ipfs from '../../components/ipfs'

const options = [
    { key: 'H', text: 'Halal', value: 'Halal' },
    { key: 'NH', text: 'Non-Halal', value: 'Non-Halal' },
]

class defContainerForm extends Component {

    state = {
        WarehouseID:'',
        WarehouseSize:'',
        WarehouseAddress:'',
        AreaCode:'',
        HalalStatus:'',
        errorMessage:'',
        buffer: null,
        loading: false
    }

    handleHalalStatus = (e, { value }) => this.setState({ HalalStatus: value })

    // captureFile = event => {
    //     event.preventDefault();
    //     const file = event.target.files[0];
    //     const reader = new window.FileReader();
    //     reader.readAsArrayBuffer(file);
    //     reader.onloadend = () => {
    //         this.setState({ buffer: Buffer(reader.result) });
    //         console.log('buffer', this.state.buffer);
    //     }
    // }

    onSubmit = async (event) => {
        event.preventDefault();

        const { WarehouseID,  WarehouseAddress, WarehouseSize,AreaCode, HalalStatus } = this.state;
        // const hashResult = await ipfs.files.add(this.state.buffer);
        

        this.setState({ loading: true, errorMessage: '' });

        try{
            const accounts = await web3.eth.getAccounts();

            await container.methods.defineWarehouse(WarehouseID,  WarehouseAddress, WarehouseSize, AreaCode, HalalStatus).send({from: accounts [0]});

        } catch (err) {
            this.setState({errorMessage: err.message });
        }

     this.setState({ loading: false });
    };

    render() {
        return (
                
        <Layout>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
            
            <body style={{ backgroundImage:"url('https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg')", 
            height:'100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            <div class="ui container">
                <div class="equal width fields">
                <h2 align="center" style={{color:'#ffffff', fontWeight:'bold'}}>New Warehouse Form</h2>


                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Warehouse ID</label>
                        <input 
                            value={this.state.WarehouseID}
                            onChange={event =>
                                this.setState({WarehouseID: event.target.value})} placeholder="W001"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Size</label>
                        <input
                            value={this.state.WarehouseSize}
                            onChange={event =>
                                this.setState({WarehouseSize: event.target.value})}placeholder="in sq ft"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Warehouse Address</label>
                        <input 
                            label="In square fit"
                            labelPosition="right"
                            value={this.state.WarehouseAddress}
                            onChange={event =>
                                this.setState({WarehouseAddress: event.target.value})} 
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Area Code</label>
                        <input 
                            value={this.state.AreaCode}
                            onChange={event =>
                                this.setState({AreaCode: event.target.value})} placeholder="H120/NH220"
                        />
                    </Form.Field>
                    <label style={{color:'#ffffff', fontSize:'13px',fontWeight:'bold'}}>Halal Status</label>
                    <Form.Field
                        control={Select}
                        options={options}
                        onChange={this.handleHalalStatus}/>
                    
                    {/* <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Upload an Image of Warehouse:</label>
                        <input type = 'file' onChange = {this.captureFile}></input>
                    </Form.Field> */}

                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button loading= {this.state.loading} primary>Submit</Button>
                </Form>
                </div>
                </div>
            </body>
        </Layout>
        );
    }
}

export default defContainerForm;