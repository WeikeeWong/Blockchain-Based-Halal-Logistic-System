import React, { Component } from 'react';
import { Form, Button, Message, Input , Select, FormField} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import container from '../../ethereum/container';
import web3 from '../../ethereum/web3';

const options = [
    { key: 'H', text: 'Halal', value: 'Halal' },
    { key: 'NH', text: 'Non-Halal', value: 'Non-Halal' },
]

class defContainerForm extends Component {

    state = {
        ContainerNo:'',
        Description:'',
        HalalStatus:'',
        Supplier:'',
        Size:'',
        errorMessage:'',
        loading:false
    }

    handleHalalStatus = (e, { value }) => this.setState({ HalalStatus: value })

    onSubmit = async event => {
        event.preventDefault();

        const { ContainerNo, Description, HalalStatus,Supplier, Size} = this.state;

        this.setState({ loading: true, errorMessage: '' });

    try{
        const accounts = await web3.eth.getAccounts();

        await container.methods.defineContainer(ContainerNo, Description, HalalStatus, Supplier, Size).send({from: accounts [0]});

    } catch (err) {
        this.setState({ errorMessage: err.message });
     }

     this.setState({ ContainerNo:'',  Description:'',HalalStatus:'' , Supplier:'', Size:'', loading: false });
    };

    render() {
        return (
        <html>        
        <Layout style={{marginLeft:'50px', marginRight:'50px', marginTop:'50px'}}>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
            
            <body style={{ backgroundImage:"url('https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg')", 
            height:'100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            
            <div class="ui container">
                <div class="equal width fields">
                <h2 align="center" style={{color:'#ffffff', fontWeight:'bold'}}>New Container Form</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Container ID</label>
                        <Input 
                            value={this.state.ContainerNo}
                            onChange={event =>
                                this.setState({ContainerNo: event.target.value})}placeholder="C001"
                        />
                    </Form.Field>
                    <label style={{color:'#ffffff', fontSize:'13px',fontWeight:'bold'}}>Halal Status</label>
                    <Form.Field
                        control={Select}
                        options={options}
                        onChange={this.handleHalalStatus}/>
                    <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Description</label>
                        <Input
                            value={this.state.Description}
                            onChange={event =>
                                this.setState({Description: event.target.value})}
                        />
                        <br/>
                    </Form.Field>
                    <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Container's Supplier</label>
                        <Input 
                            value={this.state.Supplier}
                            onChange={event =>
                                this.setState({Supplier: event.target.value})} placeholder="Tiong Nam"
                        />
                        <br/>
                    </Form.Field>
                    <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Size</label>
                        <Input 
                            value={this.state.Size}
                            onChange={event =>
                                this.setState({Size: event.target.value})} placeholder="in ft"
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button style={{marginBottom:'20px'}} loading= {this.state.loading} primary>Submit</Button>
                </Form>
                </div>
                </div>
            </body>
        </Layout>
        </html>
        );
    }
}

export default defContainerForm;