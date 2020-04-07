import React, { Component } from 'react';
import AuthenticationComponent from '../components/authentication';
import authApi from '../../../api/routes/auth-api';
import swal from 'sweetalert';
import swalApi from '../../../api/util/swal-api';
import cookiesApi from '../../../api/util/cookies-api';

class Authentication extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSignIn: true,
      email: '',
      password: ''
    };

    this.functions = {
      handleInputChange: this.handleInputChange,
      signInOrUp: this.signInOrUp,
      toggleIssignIn: this.toggleIssignIn,
      regularSignIn: this.regularSignIn
    };
  }

  componentDidMount = () => {
    const authError = cookiesApi.get("authError");
    if (authError) {
      if (typeof authError === 'string')
        swal("Error", authError, "error");
      else
        swal("Error", "Error with the authentication", "error");
      cookiesApi.remove("authError");
    }

    const jwt = cookiesApi.get("jwt");
    if (jwt)
      this.props.history.push('/main/');
    if (this.props.invite)
      this.setState({ isSignIn: false });
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  toggleIssignIn = (isSignIn) => {
    this.setState({
      isSignIn: isSignIn
    });
  }

  signInOrUp = (authNetWork) => {
    let queryParams = window.location.search.substr(1).split('&');
    if (this.props.invite) {
      let invToken = this.getFromQueryParams(queryParams, 'inv');
      cookiesApi.set('inviteToken', invToken);
    }
    else
      cookiesApi.set('inviteToken', false);

    this.props.changeAuthNetwork(authNetWork);
    authApi.requestAuthentication(authNetWork, this.state.isSignIn);
  }

  getFromQueryParams = (queryParams, parameter) => {
    let foundCode;
    if (queryParams) {
      queryParams.forEach(element => {
        if (element.includes(parameter + "=")) {
          foundCode = element.split(parameter + "=")[1];
        }
      });
      return foundCode;
    }
    else return "";
  }

  regularSignIn = () => {
    swalApi.openLoadingModal("Authenticating");
    authApi.regularAuth({
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        cookiesApi.setUserJWT(response.data);
        swalApi.closeLoadingModal();
        this.props.history.push('/main/');
      })
      .catch(error => {
        swalApi.error(error.response ? error.response.data : "Error, please try again later");
      });
  }

  render = () =>
    <AuthenticationComponent {...this.props} {...this.functions} {...this.state} />
}

export default Authentication;