import React from "react";
import { render } from "react-dom";
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

export default props => {
    return (
        <div>
            <Header />
            {props.children}
            
        </div>
    );
};