/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import PodcastFinderParametersPanel from '../components/podcast-search-parameters-panel';
import searchParametersApi from '../../../api/routes/search-parameters-api';
import searchesApi from '../../../api/routes/searches-api';
import socketPodcastsApi from '../../../api/sockets/podcasts-api';
import socketsCommon from '../../../api/sockets/sockets-common';
import async from 'async';
import moment from 'moment';
import '../../../common/general/styles/react-autosuggest.css';

class PodcastFinderParameters extends Component {
  constructor (props) {
    super(props);
    this.state = {

      keywords: "business",
      genresList: [],
      languagesList: [],
      type: 'podcast',
      searchGenres: [],
      searchLanguage: '',
      initialLoadReady: false,
      publishAfter: null,
      publishBefore: null,
    };
    this.functions = {
      searchPodcasts: this.searchPodcasts.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      handleSelectChangeGenres: this.handleSelectChangeGenres.bind(this),
      handleSelectChangeLanguage: this.handleSelectChangeLanguage.bind(this),
      handleDatePublishAfter: this.handleDatePublishAfter.bind(this),
      handleDatePublishBefore: this.handleDatePublishBefore.bind(this),
    };

  }

  componentDidMount = () => {
    this.props.changeLoadingMessage('Loading');
    this.loadParametersLists(err => {
      if (err) this.props.finishLoading(true, 'An error has occured while loading the parameters');
      else {
        this.props.changeLoadingMessage();
        // this.checkQueryParameters();
        this.searchPodcasts(0, false, true);
      }
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentResultsPage !== this.props.currentResultsPage && !this.props.newSearch) {
      this.searchPodcasts(this.props.currentResultsPage - 1, false);
    }
  }

  checkQueryParameters = () => {
    const queryParams = this.props.history.location.search;
    const queryParamsArray = queryParams.substring(1, queryParams.length).split("&");
    let futureState = {};
    let offset = 0;
    let pagination = false;
    queryParamsArray.forEach(element => {

      const splitElement = element.split("=");
      let genresIdArray;
      let selectedgenresArray;


      switch (splitElement[0]) {
        case 'type':
          if (splitElement[1] === 'Podcasts')
            futureState.type = 'podcast';
          else
            futureState.type = 'episode';
          break;
        case 'language':
          for (let i = 0; i < this.state.languagesList.length; i++) {
            if (this.state.languagesList[i].value === splitElement[1]) {
              futureState.searchLanguage = this.state.languagesList[i];
              break;
            }
          }
          break;
        case 'genreIds':
          genresIdArray = splitElement[1].split(",");
          selectedgenresArray = [];
          genresIdArray.forEach(element => {
            for (let i = 0; i < this.state.genresList.length; i++) {
              if (this.state.genresList[i].value === Number(element)) {
                selectedgenresArray.push(this.state.genresList[i]);
                break;
              }
            }
          });
          futureState.searchGenres = selectedgenresArray;
          break;

        case 'publishedAfter':
          futureState.publishAfter = moment(Number(splitElement[1]));
          break;

        case 'publishedBefore':
          futureState.publishBefore = moment(Number(splitElement[1]));
          break;
        case 'offset':
          offset = Number(splitElement[1]);
          break;
        case 'pagination':
          pagination = splitElement[1] === 'true' ? true : false;
          break;
        default:
          futureState[splitElement[0]] = splitElement[1];
          break;
      }
    });

    if (!pagination) offset = null;
    if (futureState.keywords)
      this.setState(futureState, () => this.searchPodcasts(offset, true));
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSelectChangeGenres = selectedOption => {
    this.setState({ searchGenres: selectedOption });
  }

  handleSelectChangeLanguage = selectedOption => {
    this.setState({ searchLanguage: selectedOption });
  }

  handleDatePublishAfter = date => {
    this.setState({ publishAfter: date });
  }

  handleDatePublishBefore = date => {
    this.setState({ publishBefore: date });
  }


  searchPodcasts = (offset, newSearch, sampleSearch) => {
    this.props.changeLoadingMessage(sampleSearch ? "Loading" : "Searching");
    let searchParams = {
      type: this.state.type
    };
    if (this.state.keywords) searchParams.keywords = this.state.keywords.replace(/,/g, '_');
    if (this.state.searchLanguage) searchParams.language = this.state.searchLanguage.value;
    if (this.state.searchGenres.length > 0)
      searchParams.genreIds = this.state.searchGenres.map(elem => {
        return elem.value;
      }).join("_");
    if (this.state.publishAfter) searchParams.publishedAfter = this.state.publishAfter.valueOf();
    if (this.state.publishBefore) searchParams.publishedBefore = this.state.publishBefore.valueOf();
    if (this.state.resultsPerPage) searchParams.resultsPerPage = this.state.resultsPerPage.value;  
    if (offset && this.props.searchResults && !this.props.pagination) searchParams.offset = this.props.searchResults.offset;
    else if (offset) searchParams.offset = (offset * this.props.pageSize);

    searchParams.pagination = this.props.pagination;
    const queryParams = this.props.addQueryParameters(searchParams, '/main/podcast-search');

    let searchSocket = socketPodcastsApi.searchPodcasts(queryParams);

    socketsCommon.attempDisconnect(socketPodcastsApi.getActiveSocket());

    searchSocket.on(socketPodcastsApi.events.RESULTS_FIRST, results => {
      if (results.results && results.results.length > 0)
        this.props.toggleLoadingResults();
      this.props.changeLoadingMessage();
      this.props.changeSearchResults(results, this.state.type,
        this.state.type + 's', newSearch,
        () => {
          this.props.lookupItunesAndReviewData(searchSocket);
        });
      if (newSearch) {
        let searchObj = {
          type: "podcastSearch",
          keywords: searchParams.keywords,
          results: results.total,
          filters: { ...searchParams }
        };
        if (this.state.searchGenres.length > 0) searchObj.filters.genres = this.state.searchGenres.map(elem => {
          return elem.label;
        }).join("_");
        searchesApi.saveSearch(searchObj);
      }
    });

    searchSocket.on(socketPodcastsApi.events.RESULT_COMPLETE, completeData => {
      this.props.completeResultLoad(completeData);
    });
    searchSocket.on(socketPodcastsApi.events.RESULT_ERROR, completeData => {
      this.props.completeResultLoad(completeData, true);
    });
    searchSocket.on(socketPodcastsApi.events.RESULTS_COMPLETE, () => {
      this.props.toggleLoadingResults();
    });
    searchSocket.on(socketPodcastsApi.events.SEARCH_ERROR, () => {
      this.props.finishLoading(true, "A problem occured while searching, please try again later");
    });
  }

  loadParametersLists = callback => {
    async.parallel(
      [
        next => {
          searchParametersApi.getGenres()
            .then(response => {
              this.setState({
                genresList: response.data
              }, () => next(null, 'success'));
            })
            .catch(error => {
              next(error);
            });
        },
        next => {
          searchParametersApi.getLanguages()
            .then(response => {
              this.setState({
                languagesList: response.data
              }, () => next(null, 'success'));
            })
            .catch(error => {
              next(error);
            });
        }
      ],
      (err) => {
        if (err) callback(err);
        else callback(null, 'success');
      }
    );
  }

  componentWillUnmount = () => {
    socketsCommon.attempDisconnect(socketPodcastsApi.getActiveSocket());
  }


  render = () =>
    <PodcastFinderParametersPanel {...this.props} {...this.functions} {...this.state} />
}

export default PodcastFinderParameters;