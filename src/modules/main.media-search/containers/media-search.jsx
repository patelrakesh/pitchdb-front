import React from 'react';
import MediaSearchPanel from '../components/media-search-panel';
import update from 'immutability-helper';

class MediaSearch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searchResults: null,
      currentResultsPage: 1,
      searchType: '',
      pluralType: '',
      pagination: false,
      newSearch: true,
      resultsCurrent: [],
      searched: false,
      amountSelected: 0,
      pageSize: 20
    };

    this.functions = {
      changeSearchResults: this.changeSearchResults,
      loadMoreResults: this.loadMoreResults,
      handlePageClick: this.handlePageClick,
      togglePageViewMode: this.togglePageViewMode,
      toggleListViewMode: this.toggleListViewMode,
      toggleSelectionAll: this.toggleSelectionAll,
      handleSelected: this.handleSelected,
      changePageSize: this.changePageSize,
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

  handleSelected = index => {
    let selectedItem = this.state.resultsCurrent[index];
    selectedItem.selected = !selectedItem.selected;
    this.setState({
      resultsCurrent: update(this.state.resultsCurrent, { $splice: [[index, 1, selectedItem]] }),
      amountSelected: this.state.amountSelected + (selectedItem.selected ? 1 : -1)
    });
  }

  changeSearchResults = (results, searchType, pluralType, newSearch) => {
    this.setState({
      searchType: searchType,
      pluralType: pluralType,
      searchResults: results,
      newSearch: newSearch
    }, () => { this.getItemDataFromResults(); });
  }

  getItemDataFromResults = () => {
    this.setState(previousState => ({
      searched: true,
      resultsCurrent: (this.state.newSearch || this.state.pagination) ? this.state.searchResults.results : [...previousState.resultsCurrent, ...this.state.searchResults.results],
      itemDetail: null,
      amountSelected: (this.state.newSearch || this.state.pagination) ? 0 : this.state.amountSelected
    }));
  }

  toggleSelectionAll = pSelected => {
    let selectionItems = [];
    this.state.resultsCurrent.forEach(element => {
      let editselectedItem = element;
      editselectedItem.selected = pSelected;
      selectionItems.push(editselectedItem);
    });
    this.setState({
      resultsCurrent: selectionItems,
      amountSelected: !pSelected ? 0 : selectionItems.length
    });
  }

  changePageSize = size => {
    this.setState({pageSize: size})
  }

  render = () => <MediaSearchPanel {...this.props} {...this.state} {...this.functions} />

}

export default MediaSearch;