import React, { Component } from 'react';
import ConfigurationPanel from '../components/configuration-panel';
import changeCase from 'change-case';

class Configuration extends Component {
  constructor (props) {
    super(props);
    this.state = {

    };

    this.functions = {
      handleInputChange: this.handleInputChange.bind(this)
    };
  }

  componentDidMount = () => {
    this.setState({
      currentMethod: this.props.user.network ? changeCase.titleCase(this.props.user.network)
        + " (" + this.props.user.email + ")" : "PitchDB credentials"
    });
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render = () =>
    <ConfigurationPanel {...this.props} {...this.functions} {...this.state} />
}

export default Configuration;