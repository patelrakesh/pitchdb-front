import React, { Component } from 'react';
import PodcastFinderResultsPanel from '../components/podcast-search-results-panel';
import podcastsApi from '../../../api/routes/podcasts-api';

class PodcastFinderResults extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      itemDetail: null,
    };
    this.functions = {
      handleInputChange: this.handleInputChange,
      viewPodcastDetail: this.viewPodcastDetail,
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

  viewPodcastDetail = (podcastId, e) => {
    e.stopPropagation();
    this.props.changeLoadingMessage("Loading");
    podcastsApi.getDetailById(podcastId)
      .then(response => {
        this.setState({ itemDetail: response.data }, () => {
          this.props.changeLoadingMessage();
          window.scrollTo({
            top: window.document.getElementById('podcast-detail').offsetTop - 20
          });
        });
      })
      .catch(() => {
        this.props.finishLoading(true, "We could not load the podcast data");
      });
  }

  backToResults = (top) => {
    let id = "p-" + this.state.itemDetail.iTunesId;
    this.setState({ itemDetail: null }, () => {
      window.scrollTo({
        top: top ? window.document.getElementById('results-main').offsetTop - 20 : window.document.getElementById(id).offsetTop - 20
      });
    });
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal = () => {
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render = () =>
    <PodcastFinderResultsPanel {...this.props} {...this.functions} {...this.state} />
}

export default PodcastFinderResults;