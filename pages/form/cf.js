import React, { Component } from 'react';
import { Form, Button, Message, FormField, Select, Input, Table, Grid, GridColumn } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import inputdata from '../../ethereum/container';
import web3 from '../../ethereum/web3';

const options = [
    { key: 'H', text: 'Halal', value: 'Halal' },
    { key: 'NH', text: 'Non-Halal', value: 'Non-Halal' },
]

var data= [
    {ID:'',Desc:'', HalStatus:'', Supp:'', size:''}
]

var cID = [];
var Booked = [];

class ContainerForm extends Component {

   
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

    handleHalalStatus = (e, { value }) => this.setState({ HalalStatus: value })

    static async getInitialProps(){
     
        
        const defCount = await inputdata.methods.getdefContainerCount().call();

        const contCount = await inputdata.methods.getContainerCount().call();

        const defcontainer = await Promise.all(
            Array(parseInt(defCount)).fill().map((element, index) => {
                return inputdata.methods.defcontainer(index).call()
            })
        );

        const container = await Promise.all(
          Array(parseInt(contCount)).fill().map((element, index) => {
              return inputdata.methods.container(index).call()
          })
      );

        return {defcontainer, defCount, container, contCount};

    }

    componentDidMount(){
      return this.props.container.find((request, index) => {
        cID[index] = request._ContainerNo;
        Booked[index] = request._booked;
        console.log(cID)
      });
    }

    getContainerInfo(event){
      var j = cID.lastIndexOf(event.target.value);
       data= [
           {ID:'',Desc:'', HalStatus:'', Supp:'', size:''}
       ]
       
        return this.props.defcontainer.find((request, index) => {
        for (var i = 0; i < this.props.defCount; i++){
             if(event.target.value ===  request.ContainerNo && Booked[j] != 'Non-Available' && Booked[j] != 'Destroy'){
                this.setState({_HalalStatus:request.HalalStatus})
                {this.renderTable(request)}
                this.setState({_booked: 'Available'})
                
                this.state.value ='';
                
                return true;
              } else {
                this.state.value = 'Please enter a valid Container ID';
                return false;
             }
            }
        });
    }

    renderTable(request){
        
        data= [
            {ID:request.ContainerNo,Desc:request.Description, HalStatus:request.HalalStatus, Supp:request.Supplier, size:request.Size}
        ]
        
    }
    

    onSubmit = async event => {
        event.preventDefault();

        const {_ContainerNo, _HalalStatus, _booked, _StartDate, _EndDate, _ProductName, _Quantity } = this.state;

        this.setState({ loading: true, errorMessage: '' });

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
            <div style={{display:'flex', flexDirection: 'row'}}>
            <div style={{width:'70%', paddingLeft:'50px'}}>
            <div class="ui container">
                <div class="equal width fields">
                <h2 align="center" style={{color:'#ffffff', fontWeight:'bold'}}>Delivery Form</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    
                        <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Container ID</label>
                        <Input type="text" id ='Cid' autoComplete="off"
                            value={this.state._ContainerNo}
                            onChange={event =>{
                                this.setState({_ContainerNo: event.target.value});this.getContainerInfo(event)
                                //this.getContainerStat(event)
                                }}placeholder="C001"/>
                        
                        </Form.Field>
                        
                        <p id ='error' style={{color:'red', fontWeight:'bold'}}>{this.state.value}</p>
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
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Start Date</label>
                        <Input type='date'
                        value={this.state._StartDate}
                        onChange={event =>
                            this.setState({_StartDate: event.target.value})}placeholder="DD/MM/YYYY"/>
                        
                        </Form.Field>
                        <br/>
                        <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>End Date</label>
                        <Input type = 'date'
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
                                this.setState({_ProductName: event.target.value})}placeholder="Fish"
                        />
                        </Form.Field>
                        <br/>
                        <Form.Field>
                        <label style={{color:'#ffffff', fontWeight:'bold'}}>Quantity</label>
                        <Input 
                            value={this.state._Quantity}
                            onChange={event =>
                                this.setState({_Quantity: event.target.value})}placeholder="in Unit"
                        />
                        </Form.Field>
                        <br/>
                    
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button style={{marginBottom:'20px'}} loading= {this.state.loading} primary>Submit</Button>
                </Form>
                </div>
                </div>
                </div>
                <div style={{width:'30%', marginLeft:'30px', marginRight:'50px', marginTop:'18px'}}>
                    <h2 style={{color:'#ffffff', fontWeight:'bold'}}>Container's Details</h2>
                    
                    {data.map((cont, i) => {
                    return(
                        <Grid celled style={{backgroundColor:'#ffffff'}}>
                        <Grid.Row>
                          <Grid.Column width={8}>
                            <h3>Container ID</h3>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <h4>{cont.ID}</h4>
                          </Grid.Column>
                        </Grid.Row>
                    
                        <Grid.Row>
                          <Grid.Column width={8}>
                            <h3>Description</h3>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <h4>{cont.Desc}</h4>
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column width={8}>
                            <h3>Halal Status</h3>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <h4>{cont.HalStatus}</h4>
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column width={8}>
                            <h3>Supplier</h3>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <h4>{cont.Supp}</h4>
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column width={8}>
                            <h3>Size (ft)</h3>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <h4>{cont.size}</h4>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    )
                })}
                </div>
        </div>
        </body>
        </Layout>
        
        );
    }
}

export default ContainerForm;