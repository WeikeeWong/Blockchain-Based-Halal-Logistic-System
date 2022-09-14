import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class RequestRowDefWa extends Component{
    render(){
        const {Row, Cell} = Table;
        const {request,id} = this.props;

        return(
            <Row>
                <Cell>{id}</Cell>
                <Cell>{request.WarehouseID}</Cell>
                <Cell>{request.WarehouseAddress}</Cell>
                <Cell>{request.WarehouseSize}</Cell>
                <Cell>{request.AreaCode}</Cell>
                <Cell>{request.HalalStatus}</Cell>
            </Row>
        )
    }
}

export default RequestRowDefWa;