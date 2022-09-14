import React, { Component, useRef } from 'react';
import { Button, Table } from 'semantic-ui-react';
import container from '../ethereum/container';
import web3 from '../ethereum/web3';

class RequestWa extends Component{

    render(){
        const {Row, Cell} = Table;
        const {wID, Size, Code, Addr, Product, Quantity, Stat, id} = this.props;
        return(
            <Row>
            <Cell>{id}</Cell>
            <Cell>{wID}</Cell>
            <Cell>{Size}</Cell>
            <Cell>{Code}</Cell>
            <Cell>{Addr}</Cell>
            <Cell>{Product}</Cell>
            <Cell>{Quantity}</Cell>
            <Cell>{Stat}</Cell>
            </Row>
        )
    }
}

export default RequestWa;