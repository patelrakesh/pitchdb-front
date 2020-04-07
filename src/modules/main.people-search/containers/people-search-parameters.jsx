import React, { Component } from 'react';
import GuestFinderParametersPanel from '../components/people-search-parameters-panel';
import searchParametersApi from '../../../api/routes/search-parameters-api';
import parametersApi from '../../../api/routes/parameters-api';
import guestsApi from '../../../api/routes/guests-api';
import searchesApi from '../../../api/routes/searches-api';
import '../../../common/general/styles/react-autosuggest.css';
import async from 'async';

class GuestFinderParameters extends Component {
  constructor (props) {
    super(props);
    this.state = {

      typeSearch: { value: 'guest', label: 'Guests' },
      initialLoadReady: false,

      // General parameters

      keywords: "",

      // Guest parameters

      exclude: "",
      industriesList: [],

    };

    this.functions = {
      search: this.search.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      handleTypeSwitch: this.handleTypeSwitch.bind(this),

      changeParameters: this.changeParameters.bind(this),
      handleIndustry: this.handleIndustry.bind(this)
    };
  }

  componentDidMount = () => {
    this.props.changeLoadingMessage('Loading');
    this.loadParametersLists(err => {
      if (err) this.props.finishLoading(true, 'An error has occured while loading the parameters');
      else {
        this.props.changeLoadingMessage();
        this.search(0, true);
      }
    });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.searchType !== 'guest' && prevProps.currentResultsPage !== this.props.currentResultsPage && !this.props.newSearch) {
      this.search(this.props.currentResultsPage - 1, false);
    }
  }

  changeParameters = parametersObj => {
    this.setState(parametersObj);
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleTypeSwitch = selectedOption => {
    this.setState({ typeSearch: selectedOption }, () => {
    });
  }

  // Guests

  handleIndustry = selectedIndustry => {
    this.setState({ industry: selectedIndustry });
  }

  loadParametersLists = callback => {
    if (this.state.typeSearch.value === 'guest')
      async.parallel(
        [
          next => {
            this.loadGuestsParameters(next);
          }
        ],
        (err) => {
          if (err) callback(err);
          else callback(null, 'success');
        }
      );
  }

  loadGuestsParameters = callback => {
    async.parallel(
      [
        next => {
          searchParametersApi.getGuestIndustries()
            .then(response => {
              this.setState({
                industriesList: response.data
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


  // =======================================================================

  search = (offset, sampleSearch) => {

    this.props.changeLoadingMessage(sampleSearch ? "Loading" : "Searching");

    let searchParams = {};

    if (this.state.country) searchParams.country = this.state.country.label;
    if (this.state.city) searchParams.city = this.state.city.label;
    if (this.state.state) searchParams.state = this.state.state.value;

    if (this.state.typeSearch.value === 'guest') {
      searchParams.keywords = this.state.keywords;
      if (this.state.country) searchParams.country = this.state.country.value;
      else searchParams.country = 'all';
      if (this.state.exclude) searchParams.exclude = this.state.exclude;
      if (this.state.industry) searchParams.industry = this.state.industry.value;
      if (this.state.jobTitle) searchParams.jobTitle = this.state.jobTitle.title;
    }

    if (offset && this.props.searchResults) searchParams.offset = this.props.searchResults.offset;
    else if (offset) searchParams.offset = offset;

    searchParams.pagination = this.props.pagination;
    const queryParams = this.props.addQueryParameters(searchParams, '/main/people-search');

    switch (this.state.typeSearch.value) {
      case 'guest':
        guestsApi.searchGuests(queryParams)
          .then(response => {
            this.props.changeSearchResultsFile(response.data);
            if (offset == 0)
              searchesApi.saveSearch({
                type: "peopleSearch",
                keywords: searchParams.keywords,
                filters: { type: "guest", ...searchParams }
              });
          })
          .catch(() => {
            this.props.finishLoading(true, "An error occured, please try again later");
          });
        break;
      default:
        break;
    }
  }

  render = () =>
    <GuestFinderParametersPanel
      searchJobTitles={parametersApi.searchJobTitleParameters}
      {...this.props} {...this.functions} {...this.state} />
}

export default GuestFinderParameters;