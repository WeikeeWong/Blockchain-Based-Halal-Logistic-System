import React, { Component } from 'react';
import { Form, Button, Message, FormField, Select, Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import inputdata from '../../ethereum/container';
import web3 from '../../ethereum/web3';

const options = [
    { key: 'H', text: 'Halal', value: 'Halal' },
    { key: 'NH', text: 'Non-Halal', value: 'Non-Halal' },
]

const option2 = [
    { key: 'AB', text: 'Available', value: 'Available' },
    { key: 'NAB', text: 'Non-Available', value: 'Non-Available' },
    { key: 'D', text: 'Destroy', value: 'Destroy' },
]

var match = false;

class ContainerUpdate extends Component {

    state = {
        _ContainerNo:'',
        _HalalStatus:'',
        _booked:'',
        _StartDate:'',
        _EndDate:'',
        _ProductName:'',
        _Quantity:'',
        errorMessage:'',
        value:'',
        loading:false
    };

    handleConStatus = (e, { value }) => this.setState({ _booked: value })

    static async getInitialProps(){
     
        const contCount = await inputdata.methods.getContainerCount().call();

        const container = await Promise.all(
            Array(parseInt(contCount)).fill().map((element, index) => {
                return inputdata.methods.container(index).call()
            })
        );

        return {container, contCount};

    }

    getContainerInfo(event){
       
         return this.props.container.some((request, index) => {
         for (var i = 0; i < this.props.contCount; i++){
              if(event.target.value ===  request._ContainerNo){
                  this.setState({_StartDate:request._StartDate, _EndDate:request._EndDate, _ProductName:request._ProductName, _Quantity:request._Quantity,_HalalStatus:request._HalalStatus})
                  
                 this.state.value =' ';
                 return true;
               } else {
                
                 this.state.value = 'Please enter a valid Container ID';
                 return false;
              }
             }
         });
     }

    onSubmit = async event => {
        event.preventDefault();

        const {_ContainerNo, _HalalStatus, _booked, _StartDate, _EndDate, _ProductName, _Quantity } = this.state;

        this.setState({ loading: true, errorMessage: '' });

        // if(match){
        //     return;
        // }
    try{
        
        const accounts = await web3.eth.getAccounts();

        await inputdata.methods.registerContainer(_ContainerNo, _HalalStatus, _booked, _StartDate, _EndDate, _ProductName, _Quantity).send({from: accounts [0]});

    } catch (err) {
        this.setState({ errorMessage: err.message });
     }

     this.setState({ _ContainerNo:'',
     _HalalStatus:'',_booked:'', _StartDate:'', _EndDate:'', _ProductName:'',_Quantity:'', errorMessage:'', loading:false });
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
                <h2 align="center" style={{color:'#ffffff', fontWeight:'bold'}}>Update Container Form</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    
                        <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Container ID</label>
                        <Input 
                            value={this.state._ContainerNo}
                            onChange={event =>{
                                this.setState({_ContainerNo: event.target.value});this.getContainerInfo(event)}}
                        />
                        </Form.Field>

                        <p id ='error' style={{color:'red', fontWeight:'bold'}}>{this.state.value}</p>

                        <br/>
                        <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Start Date</label>
                        <Input 
                            value={this.state._StartDate}
                            onChange={event =>
                                this.setState({_StartDate: event.target.value})}
                        />
                        </Form.Field>
                        <br/>
                        <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>End Date</label>
                        <Input 
                            value={this.state._EndDate}
                            onChange={event =>
                                this.setState({_EndDate: event.target.value})}
                        />
                        </Form.Field>
                        <br/>
                        <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Product Name</label>
                        <Input
                            value={this.state._ProductName}
                            onChange={event =>
                                this.setState({_ProductName: event.target.value})}
                        />
                        </Form.Field>
                        <br/>
                        <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Halal Status</label>
                        <Input 
                            value={this.state._HalalStatus}
                            onChange={event =>
                                this.setState({_HalalStatus: event.target.value})}placeholder="Halal/Non-Halal"
                        />
                        </Form.Field>
                        <br/>
                        <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Quantity</label>
                        <Input 
                            value={this.state._Quantity}
                            onChange={event =>
                                this.setState({_Quantity: event.target.value})}
                        />
                        </Form.Field>
                        
                        <br/>
                        <label style={{color:'#ffffff', fontSize:'13px',fontWeight:'bold'}}>Status</label>
                        <Form.Field
                        fontWeight='bold'
                        control={Select}
                        options={option2}
                        onChange={this.handleConStatus}/>
                        
                        <br/>
                    
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button style={{marginBottom:'20px'}} loading= {this.state.loading} primary>Submit</Button>
                </Form>
                </div>
                </div>
            </body>
        </Layout>
        
        );
    }
}

export default ContainerUpdate;