import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class RequestRow extends Component{
    render(){
        const {Row, Cell} = Table;
        const {request,id} = this.props;

        return(
            <Row>
                <Cell>{id}</Cell>
                <Cell>{request.WarehouseID}</Cell>
                <Cell>{request.WarehouseSize}</Cell>
                <Cell>{request.WarehouseAddress}</Cell>
                <Cell>{request.AreaCode}</Cell>
                <Cell>{request.ProductName}</Cell>
                <Cell>{request.Quantity}</Cell>
                <Cell>{request.Status}</Cell>
            </Row>
        )
    }
}

export default RequestRow;