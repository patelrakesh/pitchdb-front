import React, { Component } from 'react';
import ForgotPasswordComponent from '../components/forgot-password';
import authApi from '../../../api/routes/auth-api';
import swalApi from '../../../api/util/swal-api';

class ForgotPassword extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      emailSent: false
    };

    this.functions = {
      handleInputChange: this.handleInputChange,
      resetPassword: this.resetPassword
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  resetPassword = () => {
    swalApi.openLoadingModal("Sending email");
    authApi.resetPassword({ email: this.state.email })
      .then(() => {
        swalApi.closeLoadingModal();
        this.setState({ emailSent: true });
      })
      .catch(() => {
        swalApi.error('An unexpected error occured, please try again later');
      });
  }

  render = () => <ForgotPasswordComponent {...this.state} {...this.props} {...this.functions} />
}

export default ForgotPassword;