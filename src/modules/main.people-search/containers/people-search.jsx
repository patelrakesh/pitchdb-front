import React, { Component } from 'react';
import GuestFinderPanel from '../components/people-search-panel';
import peopleSearchServices from '../services/people-search';

class PeopleSearch extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchResults: null,
      currentResultsPage: 1,
      searchType: '',
      pluralType: '',
      pagination: false,
      newSearch: true,
      searchResultsFile: null,
      fileSearchresults: []
    };

    this.functions = {
      changeSearchResults: this.changeSearchResults.bind(this),
      loadMore: this.loadMore.bind(this),
      changeSearchResultsFile: this.changeSearchResultsFile.bind(this),
      parseFileData: this.parseFileData.bind(this),
      updateFileSearchResults: this.updateFileSearchResults.bind(this),
      loadMoreFileData: this.loadMoreFileData.bind(this)
    };
  }

  loadMore = () => {
    this.setState({
      currentResultsPage: this.state.currentResultsPage + 1,
      newSearch: false
    });
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  changeSearchResults = (results, searchType, newSearch, pluralType, maxResultsPage) => {
    let currentMaxPage = this.state.maxResultsPage;
    this.setState({
      searchResults: results,
      searchType: searchType,
      pluralType: pluralType,
      newSearch: newSearch,
      maxResultsPage: maxResultsPage ? maxResultsPage : currentMaxPage,
    }, () => { this.props.changeLoadingMessage(); });
  }

  changeSearchResultsFile = resultFile => {
    this.setState({
      searchResultsFile: resultFile
    }, () => {
      this.parseFileData(true);
    });
  }

  updateFileSearchResults = results => {
    this.setState({ fileSearchresults: results });
  }

  parseFileData = newSearch => {
    const iFrame = document.getElementById("guestFinderFrame");
    peopleSearchServices.parseResults(iFrame, 'linkedin', newSearch ? 1 : this.state.currentResultsPage, newSearch ? [] : this.state.fileSearchresults, (results, maxPage) => {
      this.changeSearchResults({
        results: results
      }, 'guest', newSearch, 'guests', maxPage);
    });
  }

  loadMoreFileData = () => {
    this.props.changeLoadingMessage("Loading");
    let nextPage = this.state.currentResultsPage + 1;
    this.setState({
      currentResultsPage: nextPage
    }, () => {
      this.parseFileData(false);
    });
  }

  render = () =>
    <GuestFinderPanel {...this.props} {...this.functions} {...this.state} />
}

export default PeopleSearch;