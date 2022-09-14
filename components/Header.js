import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';


export default () => {
    return (
        <div style={{ backgroundImage:"url('https://images.pexels.com/photos/6348820/pexels-photo-6348820.jpeg')"}}>
            <Menu style={{ marginTop: '5px ', marginLeft:'80px', marginRight:'80px', backgroundColor:'#424240'}}>

            <Link route="/">
                <a className="item" style={{color:'#ffffff', fontWeight:'bold'}}>Halal Logistic System</a>
            </Link>

            <Menu.Menu position="right">

                <Link route="/form/Record">
                    <a className="item" style={{color:'#ffffff', fontWeight:'bold'}}>Records</a>
                </Link>
                

            </Menu.Menu>          
            </Menu>
            </div>
    );
};