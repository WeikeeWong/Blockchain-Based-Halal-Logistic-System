import React, { Component } from 'react';
import { Button, Card } from 'semantic-ui-react';
import Input from '../ethereum/container';
import { Link } from '../routes';
import Layout from '../components/Layout';
import { Grid } from 'semantic-ui-react';


class ReviewIndex extends Component {

    static async getInitialProps(){
        const info = await Input.methods.getContainerCount().call();
        const info2 = await Input.methods.getWarehouseCount().call();
        const info3 = await Input.methods.getdefContainerCount().call();
        const info4 = await Input.methods.getdefWarehouseCount().call();

        const defcontainer = await Promise.all(
            Array(parseInt(info3)).fill().map((element, index) => {
                return Input.methods.defcontainer(index).call()
            })
        );

        return { Count: info[0],
                Count2: info2[0],
                Count3: info3[0],
                Count4: info4[0], 
                defcontainer
        };
    }

    renderContainer(){
        const{
            Count
        } = this.props;

            const items = [
                {
                    header: Count,
                    description:<Link route="/form/DetailsCont"><a>View Container details</a></Link>,
                    fluid: true
                }
            ];
            return <Card.Group items={items}/>;
        
 }

    renderRegContainer(){
        const{
            Count3
        } = this.props;

            const items = [
                {
                    header: Count3,
                    description: 'The quantity of registered containers will be display here and user can update container in here'
                }
            ];
            return <Card.Group items={items}/>;      
 }

 renderRegWarehouse(){
    const{
        Count4
    } = this.props;

        const items = [
            {
                header: Count4,
                description: 'The quantity of registered warehouses will be display here and user can update warehouse in here'
            }
        ];
        return <Card.Group items={items}/>;      
}

 renderContStat(){
    const{
        Count
    } = this.props;

        const items = [
            {
                header: Count,
                description: 'Check Container Status'
                
            }
        ];
        return <Card.Group items={items}/>;      
}

renderWaStat(){
    const{
        Count2
    } = this.props;

        const items = [
            {
                header: Count2,
                description: 'Check Warehouse Status'
                
            }
        ];
        return <Card.Group items={items}/>;      
}

renderWarehouse() {
        const{
            Count2
        } = this.props;

        const items = [
            {
                header: Count2,
                description:<Link route="form/DetailsWa"><a>View Warehouse details</a></Link>,
                fluid: true
            }

        ];
        return<Card.Group items={items}/>
    }

renderdefContainer() {
        const{
            Count3
        } = this.props;

        const items = [
            {
                header: Count3,
                description:<Link route="form/DetailsDefCont"><a>View Defined Container details</a></Link>,
                fluid: true
            }
        ];
        return<Card.Group items={items}/>
    }

renderdefWarehouse() {
        const{
            Count4
        } = this.props;

        const items = [
            {
                header: Count4,
                description:<Link route="form/DetailsDefWa"><a>View Defined Warehouse details</a></Link>,
                fluid: true
            }
        ];
        return<Card.Group items={items}/>
    }

    render(){
        return (
        <html>
        <head>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"/>
         <link rel="stylesheet" href="components/style.css"/>
        </head>
        <Layout>
        <body >
        <div style={{ backgroundImage:"url('https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg')", 
        height:'100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}>
        <Grid>
        <Grid.Column width={10}>
        <div class='ui segments'style={{marginLeft:'80px', paddingBottom:'100px'}}>
        <div style={{marginLeft:'20px', marginRight:'20px'}}>
            <h2 style={{color:'#ffffff'}}>Define a New Container</h2>
            {this.renderdefContainer()}
            <Link route="/form/defContainer">
            <Button content="Define new Container" icon="add circle" primary floated="left"></Button></Link>
            <br></br>
        </div>
        <br></br>
        <div style={{marginLeft:'20px', marginRight:'20px'}}>
            <h2 style={{color:'#ffffff'}}>Define a New Warehouse</h2>
            {this.renderdefWarehouse()}
            <Link route="/form/defWarehouse">
            <Button content="Define new Warehouse" icon="add circle" primary floated="left"></Button></Link>
            <br></br>
        </div>
        <br></br>
        <div style={{marginLeft:'20px', marginRight:'20px'}}>
            <h2 style={{color:'#ffffff'}}>Delivery Activity</h2>
            {this.renderContainer()}
            <Link route="/form/cf">
            <Button content="Create More Transaction" icon="add circle" primary floated="left"></Button></Link>

        </div>
        <br></br>
        <div style={{marginLeft:'20px', marginRight:'20px', marginTop:'20px'}}>
            <h2 style={{color:'#ffffff'}}>Storing Activity</h2>
            {this.renderWarehouse()}

            <Link route="/form/warehouseForm">
            <Button content="Create More Transaction" icon="add circle" primary floated="left"></Button></Link>
            <br></br>
        </div>
        </div>
        </Grid.Column>
        <div class= 'ui segments'style={{marginTop: '15px', marginLeft:'100px', marginBottom:'30px'}}>
        <Grid.Column width={6}>
        <h2 style={{color:'#ffffff'}}>Available Info</h2>
        <div style={{marginTop: '10px'}}>
            {this.renderRegContainer()}
        </div>
        <Link route="/form/updateContainer">
            <Button content="Update Container" icon="add circle" primary floated="left"></Button></Link>

        <div style={{marginTop:'40px'}}>
            {this.renderRegWarehouse()}
        </div>
        
        <Link route="/form/updateWarehouse">
            <Button content="Update Warehouse" icon="add circle" primary floated="left"></Button></Link>

        <div style={{marginTop:'40px'}}><h2 style={{color:'#ffffff'}}>Status Info</h2></div>
        
        <div style={{marginTop:'10px'}}>
            {this.renderContStat()}
        </div>
        
        <Link route="/shows/ShowAvailable">
            <Button content="Check Container Status" icon="arrow circle right" primary floated="left"></Button></Link>

        <div style={{marginTop:'40px'}}>
            {this.renderWaStat()}
        </div>
        
        <Link route="/shows/showWa">
            <Button content="Check Warehouse Status" icon="arrow circle right" primary floated="left"></Button></Link>
        </Grid.Column>
        </div>
        </Grid>
        </div>
        </body>
        </Layout>
        </html>
        );
    }

}
export default ReviewIndex;