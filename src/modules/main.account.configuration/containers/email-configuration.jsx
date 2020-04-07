import React, { Component } from 'react';
import emailConfigurationApi from '../../../api/routes/email-configuration-api';
import emailAccountsApi from '../../../api/routes/email-accounts-api';
import swalApi from '../../../api/util/swal-api';
import EmailConfigurationPanel from '../components/email-configuration-panel';

class EmailConfiguration extends Component {
  constructor (props) {
    super(props);
    this.state = {
      emailAccounts: []
    };
    this.functions = {
      handleInputChange: this.handleInputChange,
      configureAccount: this.configureAccount,
      setPrimaryAccount: this.setPrimaryAccount
    };
  }

  componentDidMount = () => {
    this.props.changeLoadingMessage("Loading");
    this.loadAccounts(() => this.props.changeLoadingMessage());
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  configureAccount = network => {
    this.props.changeEmailAuthNetwork(network);
    emailConfigurationApi.requestAuthentication(network);
  }

  setPrimaryAccount = id => {
    swalApi.openConfirmation("Set this account as your primary sending account?", null, "Set")
      .then(confirm => {
        if (confirm) {
          this.props.changeLoadingMessage("Setting primary");
          emailAccountsApi.activateAccount(id)
            .then(response => {
              this.loadAccounts(() => this.props.finishLoading(false, "Set " + response.data.email + " as the primary sending account"));
            })
            .catch(() => {
              this.props.finishLoading(true, "There was an error setting your primary account");
            });
        }
      });
  }

  loadAccounts = callback => {
    emailAccountsApi.getEmailAccounts()
      .then(response => {
        if (response.data)
          this.setState({ emailAccounts: response.data });
        callback();
      })
      .catch(() => {
        callback();
      });
  }

  render = () =>
    <EmailConfigurationPanel {...this.props} {...this.functions} {...this.state} />
}

export default EmailConfiguration;