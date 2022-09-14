import React, { Component } from 'react';
import { Form, Button, Message, Grid , Input} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import container from '../../ethereum/container';
import web3 from '../../ethereum/web3';

var data=[
    {ID:'', Size:'', Addr:'', Code:'', HalStatus:''}
]

class WarehouseForm extends Component {

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

    static async getInitialProps(){
     
        
        const defwaCount = await container.methods.getdefWarehouseCount().call();

        const defwarehouse = await Promise.all(
            Array(parseInt(defwaCount)).fill().map((element, index) => {
                return container.methods.defwarehouse(index).call()
            })
        );

        const warehouseCount = await container.methods.getWarehouseCount().call();

        const warehouse = await Promise.all(
            Array(parseInt(warehouseCount)).fill().map((element, index) => {
                return container.methods.warehouse(index).call()
            })
        );

        return {defwarehouse, defwaCount, warehouse};

    }

    getWarehouseInfo(event){
        const {request} = this.props;
        data= [
            {ID:'', Size:'', Addr:'', Code:'', HalStatus:''}
        ]
         return this.props.defwarehouse.find((request, index) => {
          for (var i = 0; i < this.props.defwaCount; i++){
              if(event.target.value ==  request.WarehouseID){
                  this.setState({WarehouseID: request.WarehouseID,WarehouseSize:request.WarehouseSize, WarehouseAddress:request.WarehouseAddress})
                 {this.renderTable(request)}
                 this.setState({Status:'Not Full'})

                 this.state.value = '';

                 return true;
              } else {
                this.state.value = 'Please enter a valid Warehouse ID'
                return false;
              }
          }
         });
     }


     getWarehouseStat(){
       return this.props.warehouse.map((request, index) => {
        for (var i = 0; i < this.props.waCount; i++){
            if(request.Status ==  "Not Full"){
                this.state.value = 'Status Full'
            } 
        }
       });
   }

     renderTable(request){
        
        data= [
            {ID:request.WarehouseID, Size:request.WarehouseSize, Addr:request.WarehouseAddress, Code:request.AreaCode, HalStatus:request.HalalStatus}
        ]
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
        <html>
        <Layout>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
            
            <body style={{ backgroundImage:"url('https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg')", 
            height:'100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            <div style={{display:'flex', flexDirection: 'row'}}>
            <div style={{width:'70%', paddingLeft:'50px'}}>
            <div class="ui container">
                <div class="equal width fields">
                <h2 align="center" style={{color:'#ffffff', fontWeight:'bold'}}>Storing Form</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                          <label style={{color:'#ffffff', fontWeight:'bold'}}>Warehouse ID</label>
                          <Input 
                            value={this.state.WarehouseID}
                            onChange={event =>{
                                this.setState({WarehouseID: event.target.value});this.getWarehouseInfo(event);this.getWarehouseStat()}}
                                placeholder="W001"
                          />
                        </Form.Field>

                        <p id ='error' style={{color:'red', fontWeight:'bold'}}>{this.state.value}</p>
                        
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

                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} primary>Submit</Button>
                </Form>
                </div>
                </div>
                </div>
                <div style={{width:'30%', marginLeft:'30px', marginRight:'50px', marginTop:'18px'}}>
                    <h2 style={{color:'#ffffff', fontWeight:'bold'}}>Warehouse's Details</h2>
                    
                    {data.map((wa, i) => {
                    return(
                        <Grid celled style={{backgroundColor:'#ffffff'}} >
                        <Grid.Row>
                          <Grid.Column width={8}>
                            <h3>Warehouse ID</h3>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <h4>{wa.ID}</h4>
                          </Grid.Column>
                        </Grid.Row>
                    
                        <Grid.Row>
                          <Grid.Column width={8}>
                            <h3>Warehouse Size</h3>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <h4>{wa.Size}</h4>
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column width={8}>
                            <h3>Address</h3>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <h4>{wa.Addr}</h4>
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column width={8}>
                            <h3>AreaCode</h3>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <h4>{wa.Code}</h4>
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                          <Grid.Column width={8}>
                            <h3>Halal Status</h3>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <h4>{wa.HalStatus}</h4>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    )
                })}

                </div>
            </div>
            </body>
        </Layout>
        </html>
        );
    }
}

export default WarehouseForm;