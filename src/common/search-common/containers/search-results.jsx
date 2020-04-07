import React, { Component } from 'react';
import SearchResultsPanel from '../components/search-results-panel';
import listsApi from '../../../api/routes/lists-api';
import update from 'immutability-helper';
import async from 'async';

class SearchResults extends Component {
  constructor (props) {
    super(props);
    this.state = {
      morePage: 1,
      visibleBackTop: false,
      lists: [],

      creationMode: false,
      newListName: ''
    };

    this.functions = {
      toggleViewMode: this.toggleViewMode,
      backToTop: this.backToTop,
      onExitViewport: this.onExitViewport,
      onProgress: this.onProgress,
      loadMore: this.loadMore,
      addItemToList: this.addItemToList,
      handleListSelected: this.handleListSelected,
      toggleListCreation: this.toggleListCreation,
      handleInputChange: this.handleInputChange,
      createList: this.createList
    };
  }

  componentDidMount = () => {
    this.loadUserLists();
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  loadUserLists = () => {
    listsApi.getUserLists(0, true)
      .then(response => {
        this.setState({
          lists: response.data
        });
      })
      .catch(() => {
        this.props.finishLoading(true,"We could not load your lists, please try again later");
      });
  }

  toggleViewMode = () => {
    if (this.state.resultsViewMode === 'paginate') {
      this.setState({ resultsViewMode: 'load' }, () => { this.props.onLoadMode(); });
    }
    else {
      this.setState({ resultsViewMode: 'paginate' }, () => { this.props.onPaginateMode(); });
    }
  }

  backToTop = (e) => {
    e.stopPropagation();
    this.setState({ visibleBackTop: false });
    window.scrollTo({
      top: window.document.getElementById('cont-results').offsetTop
    });
  }

  onExitViewport = () => {
    this.setState({ visibleBackTop: false });
  }

  onProgress = ({ progress }) => {
    let threshold = 0.35 / this.state.morePage;
    if (progress > threshold && !this.state.visibleBackTop)
      this.setState({ visibleBackTop: true });
    else if (progress < threshold)
      this.setState({ visibleBackTop: false });
  }

  loadMore = () => {
    this.setState({ morePage: this.state.morePage + 1 }, () => {
      this.props.loadMoreResults();
    });
  }

  toggleListCreation = () => {
    this.setState(
      {
        creationMode: !this.state.creationMode,
        newListName: '',
        listCreateError: ''
      });
  }


  handleListSelected = index => {
    let selectedList = this.state.lists[index];
    if (!selectedList.selected)
      selectedList.selected = true;
    else
      selectedList.selected = false;
    this.setState({
      lists: update(this.state.lists, { $splice: [[index, 1, selectedList]] }),
    });
  }

  createList = () => {
    this.props.changeLoadingMessage("Creating");
    listsApi.createList({ name: this.state.newListName, podcasts: [], episodes: [] })
      .then(response => {
        let newList = response.data;
        newList.empty = true;
        this.setState(previousState => ({
          lists: [newList, ...previousState.lists],
          creationMode: false
        }));
        this.props.changeLoadingMessage();
      })
      .catch(() => {
        this.props.changeLoadingMessage();
        this.setState({ listCreateError: "There is already a list with that name. Please choose another one" });
      });
  }

  addItemToList = () => {
    this.props.closeModal();
    this.props.changeLoadingMessage("Adding");
    let selectedLists = [];
    this.state.lists.forEach(element => {
      if (element.selected) {
        selectedLists.push(element);
      }
    });

    let selectedItems = [];
    this.props.resultsCurrent.forEach(element => {
      if (element.selected) {
        selectedItems.push(element);
      }
    });

    if (this.props.searchType === "guest") {
      this.props.changeLoadingMessage("Fetching emails and adding to lists, this may take a few minutes");
      this.props.lookUpGuestEmails(selectedItems, (err, procGuests) => {
        this.addItemsRequest(selectedLists, procGuests);
      });
    }
    else {
      this.addItemsRequest(selectedLists, selectedItems);
    }
  }

  addItemsRequest = (selectedLists, selectedItems) => {

    let batchList = [];

    let i, j, batchsize = 7;
    for (i = 0, j = selectedItems.length; i < j; i += batchsize) {
      let temparray = selectedItems.slice(i, i + batchsize);
      batchList.push({
        selectedLists: selectedLists,
        selectedItems: temparray
      });
    }
    async.mapSeries(batchList, this.addItemsBatch, (err) => {
      if (err) {
        this.props.finishLoading(true,"An error occured while adding the contacts, please try again later.");
      }
      else {
        this.props.finishLoading(false,"The contacts were added succesfully");
      }
    });

  }

  addItemsBatch = ({ selectedLists, selectedItems }, callback) => {
    async.mapSeries(selectedLists, (list, next) => {
      listsApi.addItemsToList(list._id, this.props.searchType, selectedItems)
        .then(response => {
          if (response.status !== 200)
            throw Error();
          else {
            next();
          }
        })
        .catch((err) => {
          next(err);
        });
    }, err => {
      if (err) callback(err);
      else callback();
    });
  }

  render = () =>
    <SearchResultsPanel {...this.props} {...this.state} {...this.functions} />
}

export default SearchResults;