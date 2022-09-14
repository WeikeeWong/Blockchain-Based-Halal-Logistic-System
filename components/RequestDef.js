import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import container from '../ethereum/container';
import web3 from '../ethereum/web3';

class RequestDef extends Component{

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
                <Cell>{request.ContainerNo}</Cell>
                <Cell>{request.Description}</Cell>
                <Cell>{request.HalalStatus}</Cell>
                <Cell>{request.Supplier}</Cell>
                <Cell>{request.Size}</Cell>
            </Row>
        )
    }
}

export default RequestDef;