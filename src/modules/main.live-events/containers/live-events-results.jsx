import React, { Component } from 'react';
import LiveEventsResultsPanel from '../components/live-events-results-panel';
import eventsApi from '../../../api/routes/events-api';

class LiveEventsResults extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      itemDetail: null
    };
    this.functions = {
      handleInputChange: this.handleInputChange,
      viewItemDetail: this.viewItemDetail,
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

  viewItemDetail = (itemId, e) => {
    e.stopPropagation();
    this.props.changeLoadingMessage("Loading");
    eventsApi.fetchEvent(itemId)
      .then(response => {
        this.setState({ itemDetail: response.data }, () => { this.props.changeLoadingMessage(); });
      })
      .catch(() => { this.props.changeLoadingMessage(); });
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
    <LiveEventsResultsPanel {...this.props} {...this.functions} {...this.state} />
}

export default LiveEventsResults;