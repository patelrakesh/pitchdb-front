import React, { Component } from 'react';
import authApi from '../../../api/routes/auth-api';
import SignInConfigurationPanel from '../components/sign-in-configuration-panel';
import cookiesApi from '../../../api/util/cookies-api';

class SignInConfiguration extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
    this.functions = {
      handleInputChange: this.handleInputChange.bind(this),
      connect: this.connect.bind(this)
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  connect = authNetWork => {
    console.log(authNetWork)
    cookiesApi.set('inviteToken', false);
    cookiesApi.set('signconfig', "y");
    this.props.changeAuthNetwork(authNetWork);
    authApi.requestAuthentication(authNetWork, this.state.isSignIn);
  }

  render = () =>
    <SignInConfigurationPanel {...this.props} {...this.functions} {...this.state} />
}

export default SignInConfiguration;