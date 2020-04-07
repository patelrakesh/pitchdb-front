import React, { Component } from 'react';
import BusinessSearchResultsPanel from '../components/business-search-results-panel';
class BusinessSearchResults extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalIsOpen: false,

    };
    this.functions = {
      handleInputChange: this.handleInputChange.bind(this),
      openModal: this.openModal.bind(this),
      afterOpenModal: this.afterOpenModal.bind(this),
      closeModal: this.closeModal.bind(this),
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  afterOpenModal = () => {

  }

  backToResults = () => {
    this.setState({ itemDetail: null });
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render = () =>
    <BusinessSearchResultsPanel {...this.props} {...this.functions} {...this.state} />
}

export default BusinessSearchResults;