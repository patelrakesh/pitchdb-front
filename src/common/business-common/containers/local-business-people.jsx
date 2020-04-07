import React, { Component } from 'react';
import update from 'immutability-helper';
import async from 'async';
import LocalBusinessPeopleComponent from '../components/local-business-people';
import peopleSearchservices from '../../../modules/main.people-search/services/people-search';
import guestsApi from '../../../api/routes/guests-api';
import searchesApi from '../../../api/routes/searches-api';
import businessPeopleUtil from '../util/business-people';

class LocalBusinessPeople extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchResultsFile: null,
      searchResults: [],
      resultsCurrent: [],
      fileSearchresults: [],
      currentResultsPage: 1,
      newSearch: true,

    };
  }

  componentDidMount = () => {
    this.searchBusinessPeople(0);
  }

  searchBusinessPeople = (offset) => {
    this.props.changeLoadingMessage("Loading");
    let searchParams = {};
    searchParams.keywords = encodeURIComponent(this.props.business.companyName);

    if (offset && this.props.searchResults) searchParams.offset = this.props.searchResults.offset;
    else if (offset) searchParams.offset = offset;
    searchParams.country = 'all';
    searchParams.pagination = false;
    if (this.props.country) searchParams.country = this.props.country.value;
    if (this.props.business.state) searchParams.state = this.props.business.state;
    let queryParams = "";
    for (var property in searchParams) {
      if (searchParams.hasOwnProperty(property)) {
        queryParams += ("&" + property + "=" + searchParams[property]);
      }
    }


    guestsApi.searchGuests(queryParams.substring(1, queryParams.length))
      .then(response => {
        this.changeSearchResultsFile(response.data);
        if (offset == 0)
          searchesApi.saveSearch({
            type: "peopleSearch",
            keywords: searchParams.keywords,
            filters: { type: "guest", ...searchParams }
          });
      })
      .catch(() => {
        this.props.finishLoading(true,"An error occured, please try again later");
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
    }, () => {
      this.getItemDataFromResults();
      this.props.changeLoadingMessage();
    });
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
    const iFrame = document.getElementById("businessPeopleFrame");
    peopleSearchservices.parseResults(iFrame, 'linkedin', newSearch ? 1 : this.state.currentResultsPage, newSearch ? [] : this.state.fileSearchresults, (results, maxPage) => {
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

  getItemDataFromResults = () => {
    const newResultsCurrent = this.state.searchResults.results.filter(guestResult =>
      businessPeopleUtil.guestWorksAtBusiness(this.props.business, guestResult)
    );
    this.setState(previousState => ({
      searched: true,
      resultsCurrent: this.state.newSearch ? newResultsCurrent : [...previousState.resultsCurrent, ...newResultsCurrent],
      itemDetail: null,
      amountSelected: this.state.newSearch ? 0 : this.state.amountSelected
    }), () => {
      this.updateFileSearchResults(this.state.resultsCurrent);
    });
  }

  handleSelected = index => {
    let selectedItem = this.state.resultsCurrent[index];
    selectedItem.selected = !selectedItem.selected;
    selectedItem.businessId = this.props.business._id;
    this.setState({
      resultsCurrent: update(this.state.resultsCurrent, { $splice: [[index, 1, selectedItem]] }),
      amountSelected: this.state.amountSelected + (selectedItem.selected ? 1 : -1)
    });
  }

  toggleSelectionAll = pSelected => {
    let selectionItems = [];
    this.state.resultsCurrent.forEach(element => {
      let editselectedItem = element;
      editselectedItem.selected = pSelected;
      editselectedItem.businessId = this.props.business._id;
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

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render = () => <LocalBusinessPeopleComponent
    {...this.props}
    {...this.state}
    loadMoreFileData={this.loadMoreFileData}
    handleSelected={this.handleSelected}
    openModal={this.openModal}
    closeModal={this.closeModal}
    lookUpGuestEmails={this.lookUpGuestEmails} />
}

export default LocalBusinessPeople;