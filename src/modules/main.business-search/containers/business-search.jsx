/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import BusinessSearchPanel from '../components/business-search-panel';
import update from 'immutability-helper';

class BusinessSearch extends Component {
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
      itemDetail: null,
      pageSize: 20
    };

    this.functions = {
      changeSearchResults: this.changeSearchResults,
      loadMoreResults: this.loadMoreResults,
      handleSelected: this.handleSelected,
      toggleSelectionAll: this.toggleSelectionAll,
      viewItemDetail: this.viewItemDetail,
      backToResults: this.backToResults,
      handlePageClick: this.handlePageClick,
      togglePageViewMode: this.togglePageViewMode,
      toggleListViewMode: this.toggleListViewMode,
      changePageSize: this.changePageSize
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

  changeSearchResults = (results, searchType, pluralType, newSearch) => {
    this.setState({
      searchResults: results,
      pluralType: pluralType,
      searchType: searchType,
      newSearch: newSearch,
      itemDetail: newSearch ? null : this.state.itemDetail,
      amountSelected: (newSearch || this.state.pagination) ? 0 : this.state.amountSelected,
      currentResultsPage: newSearch ? 1 : this.state.currentResultsPage
    }, () => { this.getBusinessDataFromResults(); });
  }

  handleSelected = index => {
    let selectedBusiness = this.state.resultsCurrent[index];
    selectedBusiness.selected = !selectedBusiness.selected;
    this.setState({
      resultsCurrent: update(this.state.resultsCurrent, { $splice: [[index, 1, selectedBusiness]] }),
      amountSelected: this.state.amountSelected + (selectedBusiness.selected ? 1 : -1)
    });
  }

  getBusinessDataFromResults = () => {
    this.setState(previousState => ({
      searched: true,
      resultsCurrent: (this.state.newSearch || this.state.pagination) ? this.state.searchResults.results : [...previousState.resultsCurrent, ...this.state.searchResults.results]
    }));
  }

  toggleSelectionAll = pSelected => {
    let selectionBusiness = [];
    this.state.resultsCurrent.forEach(element => {
      let editSelectedBusiness = element;
      editSelectedBusiness.selected = pSelected;
      selectionBusiness.push(editSelectedBusiness);
    });
    this.setState({
      resultsCurrent: selectionBusiness,
      amountSelected: !pSelected ? 0 : selectionBusiness.length
    });
  }

  backToResults = () => {
    this.setState({ itemDetail: null });
  }

  viewItemDetail = (item, e) => {
    e.stopPropagation();
    this.setState({ itemDetail: item });
  }

  changePageSize = size => {
    this.setState({pageSize: size})
  }

  render = () =>
    <BusinessSearchPanel {...this.props} {...this.functions} {...this.state} />
}

export default BusinessSearch;