import React, { Component } from 'react';
import authApi from '../../../api/routes/auth-api';
import BlankLoadingScreen from '../../../common/general/components/blank-loading-screen';

class AuthCallback extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    authApi.afterAuth();
  }

  render = () => <BlankLoadingScreen />
}

export default AuthCallback;