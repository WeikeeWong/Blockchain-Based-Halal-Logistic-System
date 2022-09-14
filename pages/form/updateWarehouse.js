import React, { Component } from 'react';
import { Form, Button, Message, FormField, Select, Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import container from '../../ethereum/container';
import web3 from '../../ethereum/web3';

const option2 = [
    { key: 'NF', text: 'Not Full', value: 'Not Full' },
    { key: 'F', text: 'Full', value: 'Full' },
]

class upWarehouseForm extends Component {

    state = {
        WarehouseID:'',
        WarehouseSize:'',
        WarehouseAddress:'',
        AreaCode:'',
        ProductName:'',
        Quantity:'',
        Status:'',
        value:'',
        loading:false

    }

    handleWaStatus = (e, { value }) => this.setState({ Status: value })

    static async getInitialProps(){
     
        
        const waCount = await container.methods.getWarehouseCount().call();

        const warehouse = await Promise.all(
            Array(parseInt(waCount)).fill().map((element, index) => {
                return container.methods.warehouse(index).call()
            })
        );

        return {warehouse, waCount};

    }

    getWarehouseInfo(event){
        
         return this.props.warehouse.find((request, index) => {
          for (var i = 0; i < this.props.waCount; i++){
              if(event.target.value ==  request.WarehouseID){
                  this.setState({WarehouseID: request.WarehouseID,WarehouseSize:request.WarehouseSize,AreaCode:request.AreaCode,WarehouseAddress:request.WarehouseAddress, ProductName:request.ProductName, Quantity:request.Quantity })

                 this.state.value = '';

                 return true;
              } else {
                this.state.value = 'Please enter a valid Warehouse ID'
                return false;
              }
          }
         });
     }


    onSubmit = async (event) => {
        event.preventDefault();

        const {WarehouseID, WarehouseSize, WarehouseAddress, AreaCode, ProductName, Quantity, Status} =this.state;

        this.setState({ loading: true, errorMessage: '' });

    try{
        const accounts = await web3.eth.getAccounts();

        await container.methods.registerWarehouse
        (WarehouseID, WarehouseSize, WarehouseAddress, AreaCode, ProductName, Quantity, Status).send({from: accounts [0]});

    } catch (err) {
        this.setState({ errorMessage: err.message });
     }

    this.setState({WarehouseID:'',WarehouseSize:'', WarehouseAddress:'', AreaCode:'', ProductName:'', Quantity:'',Status:'', loading: false });
    };

    render() {
        return (
        
        <Layout style={{marginLeft:'50px', marginRight:'50px', marginTop:'50px'}}>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
            
            <body style={{ backgroundImage:"url('https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg')", 
            height:'100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            <div class="ui container">
                <div class="equal width fields">
                <h2 align="center" style={{color:'#ffffff', fontWeight:'bold'}}>Update Warehouse Form</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                          <label style={{color:'#ffffff', fontWeight:'bold'}}>Warehouse ID</label>
                          <Input 
                            value={this.state.WarehouseID}
                            onChange={event =>{
                                this.setState({WarehouseID: event.target.value});this.getWarehouseInfo(event)}}placeholder="W001"
                          />
                        </Form.Field>
                        <Form.Field>
                          <label style={{color:'#ffffff', fontWeight:'bold'}}>Warehouse Size</label>
                          <Input 
                            value={this.state.WarehouseSize}
                            onChange={event =>
                                this.setState({WarehouseSize: event.target.value})}placeholder="in sq ft"
                          />
                        </Form.Field>
                        <Form.Field>
                          <label style={{color:'#ffffff', fontWeight:'bold'}}>Address</label>
                          <Input
                            value={this.state.WarehouseAddress}
                            onChange={event =>
                                this.setState({WarehouseAddress: event.target.value})}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label style={{color:'#ffffff', fontWeight:'bold'}}>Area Code</label>
                          <Input 
                            value={this.state.AreaCode}
                            onChange={event =>
                                this.setState({AreaCode: event.target.value})}placeholder="H001/NH001"
                          />
                        </Form.Field>
                        <Form.Field>
                          <label style={{color:'#ffffff', fontWeight:'bold'}}>Product</label>
                          <Input 
                            value={this.state.ProductName}
                            onChange={event =>
                                this.setState({ProductName: event.target.value})}placeholder="Fish"
                          />
                        </Form.Field>
                        <Form.Field>
                          <label style={{color:'#ffffff', fontWeight:'bold'}}>Quantity</label>
                          <Input 
                            value={this.state.Quantity}
                            onChange={event =>
                                this.setState({Quantity: event.target.value})}placeholder="in unit"
                          />
                        </Form.Field>
                        <label style={{color:'#ffffff', fontSize:'13px',fontWeight:'bold'}}>Status</label>
                        <Form.Field
                        control={Select}
                        options={option2}
                        onChange={this.handleWaStatus}/>
                        
                        <br/>

                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} primary>Submit</Button>
                </Form>
                </div>
                </div>
            </body>
        </Layout>
        
        );
    }
}

export default upWarehouseForm;