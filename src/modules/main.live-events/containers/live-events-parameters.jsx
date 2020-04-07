import React, { Component } from 'react';
import LiveEventsParametersPanel from '../components/live-events-parameters-panel';
import searchParametersApi from '../../../api/routes/search-parameters-api';
import searchesApi from '../../../api/routes/searches-api';
import eventsApi from '../../../api/routes/events-api';
import '../../../common/general/styles/react-autosuggest.css';
import async from 'async';
import changeCase from 'change-case';

class LiveEventsParameters extends Component {
  constructor (props) {
    super(props);
    this.state = {

      initialLoadReady: false,

      // General Parameters

      keywords: "",
      eventOrgTypes: [
        {
          optionId: "planner",
          label: "Associations"
        },
        {
          optionId: "principal",
          label: "School Principals"
        }
      ],
      typeSearch: "planner",

      // Events Parameters

      locationsList: [],
      location: null,
      placesList: [],
      place: null,
      monthsList: [],
      month: null,
      rolesList: [],
      role: null,

      // Organizers Parameters

      organizerTypesList: [],
      organizerType: null,

      schoolTypesList: [],
      schoolType: null,

      sponsorMarketsList: [],
      sponsorMarket: null,
      sponsorIndstriesList: [],
      sponsorIndustry: null,
      resultsPerPageOptions: [
        {value: 5, label: '5'},
        {value: 10, label: '10'},
        {value: 15, label: '15'},
        {value: 20, label: '20'},
        {value: 25, label: '25'},
        {value: 30, label: '30'}
      ],
      resultsPerPage: ''
    };

    this.functions = {
      search: this.search,
      handleInputChange: this.handleInputChange,

      changeParameters: this.changeParameters,

      handleLocation: this.handleLocation,
      handlePlace: this.handlePlace,
      handleMonth: this.handleMonth,
      handleRole: this.handleRole,

      handleOrganizerType: this.handleOrganizerType,
      handleSchoolType: this.handleSchoolType,
      handleSponsorMarket: this.handleSponsorMarket,
      handleSponsorIndustry: this.handleSponsorIndustry,
      handleSelectChangeResultsPerPage: this.handleSelectChangeResultsPerPage,
    };
  }

  componentDidMount = () => {
    this.props.changeLoadingMessage('Loading');
    this.loadParametersLists(err => {
      if (err) this.props.finishLoading(true, 'An error has occured while loading the parameters');
      else{
        this.props.changeLoadingMessage();
        this.search(0, false, true);
      }
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentResultsPage !== this.props.currentResultsPage && !this.props.newSearch) {
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

  // Events

  handleLocation = selectedLocation => {
    this.setState({ location: selectedLocation });
  }

  handlePlace = selectedPlace => {
    this.setState({ place: selectedPlace });
  }

  handleMonth = selectedMonth => {
    this.setState({ month: selectedMonth });
  }

  handleRole = selectedRole => {
    this.setState({ role: selectedRole });
  }

  // Organizers

  handleOrganizerType = selectedOrganizerType => {
    this.setState({ organizerType: selectedOrganizerType }, () => {
      if (selectedOrganizerType)
        if (selectedOrganizerType.value === 'school')
          searchParametersApi.getSchoolTypes()
            .then(response => {
              this.setState({ schoolTypesList: response.data });
            })
            .catch(() => {
            });
        else if (selectedOrganizerType.value === 'sponsor') {
          searchParametersApi.getSponsorIndustries()
            .then(response => {
              this.setState({ sponsorIndustriesList: response.data });
            })
            .catch(() => {
            });
          searchParametersApi.getSponsorMarkets()
            .then(response => {
              this.setState({ sponsorMarketsList: response.data });
            })
            .catch(() => {
            });
        }
    });
  }

  handleSchoolType = selectedSchoolType => {
    this.setState({ schoolType: selectedSchoolType });
  }

  handleSponsorMarket = selectedSponsorMarket => {
    this.setState({ sponsorMarket: selectedSponsorMarket });
  }

  handleSponsorIndustry = selectedSponsorIndustry => {
    this.setState({ sponsorIndustry: selectedSponsorIndustry });
  }

  handleSelectChangeResultsPerPage = selectedOption => {
    this.setState({ resultsPerPage: selectedOption });
    if (selectedOption) {
      this.props.changePageSize(selectedOption.value);
    } else {
      this.props.changePageSize(20);
    }
  }

  // =======================================================================

  search = (offset, newSearch, sampleSearch) => {

    this.props.changeLoadingMessage(sampleSearch ? "Loading" : "Searching");

    let searchParams = {};

    if (this.state.keywords) searchParams.keywords = this.state.keywords;
    //if (this.state.country) searchParams.country = this.state.country.label;
    if (this.state.city) searchParams.city = this.state.city.label;
    if (this.state.state) searchParams.state = this.state.state.value;

    if (this.state.typeSearch === 'planner') {
      if (this.state.location) searchParams.location = this.state.location.value;
      if (this.state.place) searchParams.place = this.state.place.value;
      if (this.state.month) searchParams.month = this.state.month.value;
      if (this.state.role) searchParams.roleAtOrganization = this.state.role.value;
    }

    else if (this.state.typeSearch === 'principal')
      if (this.state.schoolType) searchParams.schoolType = this.state.schoolType.value;

    searchParams.typeSearch = this.state.typeSearch;

    if (this.state.resultsPerPage) searchParams.resultsPerPage = this.state.resultsPerPage.value;
    
    if (offset && this.props.searchResults && !this.props.pagination) searchParams.offset = this.props.searchResults.offset;
    else if (offset) searchParams.offset = (offset*this.props.pageSize);

    searchParams.pagination = this.props.pagination;
    let queryParams;
    queryParams = this.props.addQueryParameters(searchParams, '/main/live-events');

    eventsApi.searchEvents(queryParams)
      .then(response => {
        this.props.changeLoadingMessage();
        this.props.changeSearchResults(response.data, 'eventOrganization', 'eventOrganizations', newSearch);
        if (this.state.schoolType) searchParams.schoolType = changeCase.sentenceCase(searchParams.schoolType);
        if (newSearch)
          searchesApi.saveSearch({
            type: "liveEvents",
            keywords: searchParams.keywords,
            results: response.data.total,
            filters: { ...searchParams }
          });
      })
      .catch(() => {
        this.props.finishLoading(true, "An error occured, please try again later");
      });
  }

  loadParametersLists = callback => {
    async.parallel(
      [
        next => {
          this.loadEventParameters(next);
        }
      ],
      (err) => {
        if (err) callback(err);
        else callback(null, 'success');
      }
    );
  }

  loadEventParameters = callback => {
    async.parallel(
      [
        next => {
          searchParametersApi.getLocations()
            .then(response => {
              this.setState({
                locationsList: response.data
              }, () => next(null, 'success'));
            })
            .catch(error => {
              next(error);
            });
        },
        next => {
          searchParametersApi.getPlaces()
            .then(response => {
              this.setState({
                placesList: response.data
              }, () => next(null, 'success'));
            })
            .catch(error => {
              next(error);
            });
        },
        next => {
          searchParametersApi.getMonths()
            .then(response => {
              this.setState({
                monthsList: response.data
              }, () => next(null, 'success'));
            })
            .catch(error => {
              next(error);
            });
        },
        next => {
          searchParametersApi.getRoles()
            .then(response => {
              this.setState({
                rolesList: response.data
              }, () => next(null, 'success'));
            })
            .catch(error => {
              next(error);
            });
        },
        next => {
          searchParametersApi.getSchoolTypes()
            .then(response => {
              this.setState({
                schoolTypesList: response.data
              }, () => next(null, 'success'));
            })
            .catch(error => {
              next(error);
            });
        },
      ],
      (err) => {
        if (err) callback(err);
        else callback(null, 'success');
      }
    );
  }

  render = () =>
    <LiveEventsParametersPanel {...this.props} {...this.functions} {...this.state} />
}

export default LiveEventsParameters;