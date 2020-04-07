import React, { Component } from 'react';
import usersApi from '../../../api/routes/users-api';
import swalApi from '../../../api/util/swal-api';
import PasswordConfigurationComponent from '../components/password-configuration';

class PasswordConfiguration extends Component {
  constructor (props) {
    super(props);
    this.state = {
      formVisible: false,
      password: '',
      newPassword: '',
      reNewPassword: '',
      passwordFitsRegex: false,
      passwordsMatch: false
    };

    this.functions = {
      onChange: this.onChange,
      changePassword: this.changePassword,
      enableForm: this.enableForm,
      disableForm: this.disableForm
    };
  }

  onChange = (event) => {
    const stateName = event.target.name;
    this.setState({
      [stateName]: event.target.value
    }, () => {
      if (stateName === 'newPassword') {
        this.validateNewPassword();
        this.validatePassWordsMatch();
      }
      else if (stateName === 'reNewPassword') {
        this.validatePassWordsMatch();
      }
    });
  }

  changePassword = () => {
    if (this.state.password === this.state.newPassword) {
      swalApi.error("Your new password cannot be the same as your old password");
    }
    else {
      this.props.changeLoadingMessage("Changing password");
      usersApi.changePassword({
        password: this.state.password,
        newPassword: this.state.newPassword
      })
        .then(() => {
          this.props.finishLoading(false, "Password changed sucessfully");
          this.disableForm();
        })
        .catch((err) => {
          if (err.response && err.response.status === 422)
            this.props.finishLoading(true, err.response.data);
          else
            this.props.finishLoading(true, "An error occured while changing your password, please try again later");
        });
    }
  }

  enableForm = () => {
    this.setState({
      formVisible: true,
      password: '',
      newPassword: '',
      reNewPassword: ''
    });
  }

  disableForm = () => {
    this.setState({
      formVisible: false
    });
  }

  validateNewPassword = () => {
    const passwordRegex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);
    const regexTest = passwordRegex.test(this.state.newPassword);
    if (!this.state.passwordFitsRegex && regexTest)
      this.setState({ passwordFitsRegex: true });
    else if (this.state.passwordFitsRegex && !regexTest)
      this.setState({ passwordFitsRegex: false });
  }

  validatePassWordsMatch = () => {
    if (!this.state.passwordsMatch && this.state.newPassword === this.state.reNewPassword)
      this.setState({ passwordsMatch: true });
    else if (this.state.passwordsMatch && this.state.newPassword !== this.state.reNewPassword)
      this.setState({ passwordsMatch: false });
  }

  render = () => <PasswordConfigurationComponent {...this.props} {...this.state} {...this.functions} />
}

export default PasswordConfiguration;