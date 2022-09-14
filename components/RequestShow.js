import React, { Component, useRef } from 'react';
import { Button, Table } from 'semantic-ui-react';
import container from '../ethereum/container';
import web3 from '../ethereum/web3';

class RequestCont extends Component{

    render(){
        const {Row, Cell} = Table;
        const {cID, HalStatus, Booked, SDate, EDate, Product, Quantity, id} = this.props;
        return(
            <Row>
            <Cell>{id}</Cell>
            <Cell>{cID}</Cell>
            <Cell>{HalStatus}</Cell>
            <Cell>{Booked}</Cell>
            <Cell>{SDate}</Cell>
            <Cell>{EDate}</Cell>
            <Cell>{Product}</Cell>
            <Cell>{Quantity}</Cell>
            </Row>
        )
    }
}

export default RequestCont;