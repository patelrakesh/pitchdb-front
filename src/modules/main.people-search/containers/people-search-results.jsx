import React, { Component } from 'react';
import GuestFinderResultsPanel from '../components/people-search-results-panel';
import update from 'immutability-helper';
import async from 'async';
import guestsApi from '../../../api/routes/guests-api';

class GuestFinderResults extends Component {
  constructor (props) {
    super(props);
    this.state = {
      resultsCurrent: [],
      searched: false,
      modalIsOpen: false,
      itemDetail: null,

      amountSelected: 0
    };
    this.functions = {
      handleInputChange: this.handleInputChange.bind(this),
      handleSelected: this.handleSelected.bind(this),
      toggleSelectionAll: this.toggleSelectionAll.bind(this),
      openModal: this.openModal.bind(this),
      afterOpenModal: this.afterOpenModal.bind(this),
      closeModal: this.closeModal.bind(this),
      backToResults: this.backToResults.bind(this),
      loadMoreResults: this.loadMoreResults.bind(this),
      lookUpGuestEmails: this.lookUpGuestEmails.bind(this)
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.searchResults !== this.props.searchResults) {
      this.setState({
        itemDetail: null,
        searched: true
      }, () => {
        this.getItemDataFromResults();
      });
    }
  }

  loadMoreResults = () => {
    switch (this.props.searchType) {
      case 'guest':
        this.props.loadMoreFileData();
        break;
      default:
        break;
    }
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  afterOpenModal = () => {

  }

  handleSelected = index => {
    let selectedItem = this.state.resultsCurrent[index];
    selectedItem.selected = !selectedItem.selected;
    this.setState({
      resultsCurrent: update(this.state.resultsCurrent, { $splice: [[index, 1, selectedItem]] }),
      amountSelected: this.state.amountSelected + (selectedItem.selected ? 1 : -1)
    });
  }

  getItemDataFromResults = () => {
    let ctx = this;
    this.setState(previousState => ({
      searched: true,
      resultsCurrent: this.props.newSearch ? ctx.props.searchResults.results : [...previousState.resultsCurrent, ...ctx.props.searchResults.results],
      itemDetail: null,
      amountSelected: this.props.newSearch ? 0 : this.state.amountSelected
    }), () => {
      this.props.updateFileSearchResults(this.state.resultsCurrent);
    });
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

  lookUpGuestEmails = (guests, callback) => {

    let batchList = [];
    let i, j, batchsize = 4;
    for (i = 0, j = guests.length; i < j; i += batchsize) {
      let temparray = guests.slice(i, i + batchsize);
      batchList.push(temparray);
    }

    async.mapSeries(batchList, this.lookUpGuestEmailsBatch, (err, batchResults) => {
      if (err) callback(err);
      else callback(null, [].concat(...batchResults));
    });
  }

  lookUpGuestEmailsBatch = (guestsBatch, callback) => {
    guestsApi.lookUpEmails(guestsBatch)
      .then(response => {
        callback(null, response.data);
      })
      .catch(error => {
        callback(error);
      });
  }

  render = () =>
    <GuestFinderResultsPanel {...this.props} {...this.functions} {...this.state} />
}

export default GuestFinderResults;