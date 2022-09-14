import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import container from '../ethereum/container';
import web3 from '../ethereum/web3';

class RequestCont extends Component{

    onApprove = async () => {

        const accounts = await web3.eth.getAccounts();
        await container.methods.approveContainer(this.props.id).send({from: accounts[0]});

    };

    render(){
        const {Row, Cell} = Table;
        const {request, id} = this.props;

        return(
            <Row>
                <Cell>{id}</Cell>
                <Cell>{request._ContainerNo}</Cell>
                <Cell>{request._HalalStatus}</Cell>
                <Cell>{request._booked}</Cell>
                <Cell>{request._StartDate}</Cell>
                <Cell>{request._EndDate}</Cell>
                <Cell>{request._ProductName}</Cell>
                <Cell>{request._Quantity}</Cell>
            </Row>
        )
    }
}

export default RequestCont;