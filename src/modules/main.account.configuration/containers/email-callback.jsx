import React, { Component } from 'react';
import emailConfigurationApi from '../../../api/routes/email-configuration-api';
import BlankLoadingScreen from '../../../common/general/components/blank-loading-screen';

class EmailCallback extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    emailConfigurationApi.afterAuth();
  }

  render = () => <BlankLoadingScreen />
}

export default EmailCallback;