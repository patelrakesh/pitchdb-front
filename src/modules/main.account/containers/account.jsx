import React, { Component } from 'react';
import AccountPanel from '../components/account-panel';

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.functions = {};
    }

    render = () =>
        <AccountPanel {...this.props} {...this.state} {...this.functions} />
}

export default Account;
