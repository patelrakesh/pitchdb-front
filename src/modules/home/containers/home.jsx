import React, { Component } from 'react';
import HomePanel from '../components/home-panel';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      forgetPasswordVisible: false
    };

    this.functions = {
      toggleForgotPassword: this.toggleForgotPassword
    };
  }

  toggleForgotPassword = () => {
    this.setState({ forgetPasswordVisible: !this.state.forgetPasswordVisible });
  }

  render = () => <HomePanel {...this.state} {...this.props} {...this.functions} />
}

export default Home;