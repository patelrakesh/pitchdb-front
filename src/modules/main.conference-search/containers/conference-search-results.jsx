/* eslint-disable linebreak-style */
import React from 'react';
import ConferenceSearchResultsPanel from '../components/conference-search-results-panel';

class ConferenceSearchResults extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.functions = {
      handleInputChange: this.handleInputChange,
      openModal: this.openModal,
      afterOpenModal: this.afterOpenModal,
      closeModal: this.closeModal,
      backToResults: this.backToResults
    };
  }

  componentDidUpdate = prevProps => {
    if (prevProps.searchResults !== this.props.searchResults && this.state.itemDetail) {
      this.backToResults(true);
    }
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

  render = () => <ConferenceSearchResultsPanel {...this.props} {...this.state} {...this.functions} />

}

export default ConferenceSearchResults;