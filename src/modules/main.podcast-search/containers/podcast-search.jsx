import React, { Component } from 'react';
import PodcastFinderPanel from '../components/podcast-search-panel';
import update from 'immutability-helper';
import async from 'async';
import podcastDataFetcher from '../services/podcast-data-fetcher';

class PodcastSearch extends Component {
  constructor (props) {
    super(props);
    this.state = {
      resultsCurrent: [],
      searchResults: null,
      currentResultsPage: 1,
      searchType: '',
      pluralType: '',
      pagination: false,
      newSearch: true,
      searched: false,
      amountSelected: 0,
      loadingResults: false,
      pageSize: 20,

      resultsToLoad: 0,
      resultsLoaded: 0,
      progressRequired: true
    };

    this.functions = {
      changeSearchResults: this.changeSearchResults,
      loadMoreResults: this.loadMoreResults,
      handleSelected: this.handleSelected,
      toggleSelectionAll: this.toggleSelectionAll,
      completeResultLoad: this.completeResultLoad,
      toggleLoadingResults: this.toggleLoadingResults,
      lookupItunesAndReviewData: this.lookupItunesAndReviewData,
      handlePageClick: this.handlePageClick,
      togglePageViewMode: this.togglePageViewMode,
      toggleListViewMode: this.toggleListViewMode
    };
  }

  loadMoreResults = () => {
    this.setState({
      currentResultsPage: this.state.currentResultsPage + 1,
      newSearch: false
    });
  }

  handlePageClick = (data) => {
    this.setState({
      currentResultsPage: data.selected + 1,
      newSearch: false
    }, () => {
      const resultsElement = window.document.getElementById('cont-results');
      if (resultsElement)
        window.scrollTo({
          top: resultsElement.offsetTop
        });
    });
  }

  togglePageViewMode = () => {
    if (!this.state.pagination)
      this.setState({
        pagination: true,
        currentResultsPage: 1
      }, () => {
        const resultsElement = window.document.getElementById('cont-results');
        if (resultsElement)
          window.scrollTo({
            top: resultsElement.offsetTop
          });
      });
  }

  toggleListViewMode = () => {
    if (this.state.pagination)
      this.setState({
        resultsCurrent: this.state.currentResultsPage === 1 ? this.state.resultsCurrent : [],
        resultsLoaded: this.state.currentResultsPage === 1 ? this.state.resultsLoaded : 0,
        resultsToLoad: this.state.currentResultsPage === 1 ? this.state.resultsToLoad : 0,
        pagination: false,
        currentResultsPage: 1
      }, () => {
        const resultsElement = window.document.getElementById('cont-results');
        if (resultsElement)
          window.scrollTo({
            top: resultsElement.offsetTop
          });
      });
  }


  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  changeSearchResults = (results, searchType, pluralType, newSearch, callback) => {
    if (!this.state.newSearch && results.total === 0)
      results.total = this.state.searchResults.total;
    this.setState({
      searchResults: results,
      searchType: searchType,
      pluralType: pluralType,
      newSearch: newSearch,
      amountSelected: (newSearch || this.state.pagination) ? 0 : this.state.amountSelected,
      currentResultsPage: newSearch ? 1 : this.state.currentResultsPage
    }, () => { this.getPodcastsDataFromResults(callback); });
  }

  handleSelected = index => {
    let selectedPodcast = this.state.resultsCurrent[index];
    selectedPodcast.selected = !selectedPodcast.selected;
    this.setState({
      resultsCurrent: update(this.state.resultsCurrent, { $splice: [[index, 1, selectedPodcast]] }),
      amountSelected: this.state.amountSelected + (selectedPodcast.selected ? 1 : -1)
    });
  }

  getPodcastsDataFromResults = callback => {
    if (!this.state.loadingResults)
      this.toggleLoadingResults();
    this.setState(previousState => ({
      searched: true,
      resultsCurrent: (this.state.newSearch || this.state.pagination) ? this.state.searchResults.results : [...previousState.resultsCurrent, ...this.state.searchResults.results],
      resultsToLoad: (this.state.newSearch || this.state.pagination) ? this.state.searchResults.results.length : this.state.resultsToLoad + this.state.searchResults.results.length,
      resultsLoaded: (this.state.newSearch || this.state.pagination) ? 0 : this.state.resultsLoaded
    }), callback);
  }

  toggleSelectionAll = pSelected => {
    let selectionPodcasts = [];
    this.state.resultsCurrent.forEach(element => {
      let editSelectedPodcast = element;
      editSelectedPodcast.selected = pSelected;
      selectionPodcasts.push(editSelectedPodcast);
    });
    this.setState({
      resultsCurrent: selectionPodcasts,
      amountSelected: !pSelected ? 0 : selectionPodcasts.length
    });
  }

  completeResultLoad = ({ index }, failed) => {
    let resultsArray = this.state.resultsCurrent;
    let podcastIndex = this.state.pagination ? index : index + (10 * (this.state.currentResultsPage - 1));
    let replacement = resultsArray[podcastIndex];
    if (!failed)
      replacement.done = true;
    else
      replacement.failed = failed;

    this.setState(prevState => ({
      resultsCurrent: update(prevState.resultsCurrent, { $splice: [[podcastIndex, 1, replacement]] }),
      resultsLoaded: this.state.resultsLoaded + 1
    }));
  }

  toggleLoadingResults = () => {
    this.setState({ loadingResults: !this.state.loadingResults });
  }

  lookupItunesAndReviewData = socket => {
    let podcastsWithSocket = [];
    for (let i = 0; i < this.state.searchResults.results.length; i++) {
      const currentPodcast = this.state.searchResults.results[i];
      podcastsWithSocket.push({
        podcast: currentPodcast,
        socket: socket,
        index: i
      });
    }
    async.mapSeries(podcastsWithSocket, podcastDataFetcher.fetchItunesReviewsData, () => { });
  }

  render = () =>
    <PodcastFinderPanel {...this.props} {...this.functions} {...this.state} />
}

export default PodcastSearch;