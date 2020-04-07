import React, { Component } from 'react';
import BusinessSearchParametersPanel from '../components/business-search-parameters-panel';
import searchesApi from '../../../api/routes/searches-api';
import businessesApi from '../../../api/routes/businesses-api';
import parametersApi from '../../../api/routes/parameters-api';
import '../../../common/general/styles/react-autosuggest.css';

class BusinessSearchParameters extends Component {
  constructor (props) {
    super(props);
    this.state = {

      initialLoadReady: false,

      // General Parameters

      keywords: "technology",
      businessesType: [
        {
          optionId: "local",
          label: "Local"
        },
        {
          optionId: "national",
          label: "National"
        }
      ],

      type: "local",

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
      handleSelectChangeResultsPerPage: this.handleSelectChangeResultsPerPage,
    };
  }

  componentDidMount = () => {
    this.checkQueryParameters();
    this.search(0, false, true);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentResultsPage !== this.props.currentResultsPage && !this.props.newSearch) {
      this.search(this.props.currentResultsPage - 1, false);
    }
  }

  changeParameters = parametersObj => {
    this.setState(parametersObj);
  }

  checkQueryParameters = () => {
  }

  handleSelectChangeResultsPerPage = selectedOption => {
    this.setState({ resultsPerPage: selectedOption });
    if (selectedOption) {
      this.props.changePageSize(selectedOption.value);
    } else {
      this.props.changePageSize(20);
    }
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // =======================================================================

  search = (offset, newSearch, sampleSearch) => {

    this.props.changeLoadingMessage(sampleSearch ? "Loading" : "Searching");

    let searchParams = {};

    if (this.state.keywords) searchParams.keywords = this.state.keywords;
    //if (this.state.country) searchParams.country = this.state.country.label;
    if (this.state.city) searchParams.city = this.state.city.label;
    if (this.state.state) searchParams.state = this.state.state.value;

    if (this.state.description && this.state.type === 'local') searchParams.descriptionId = this.state.description._id;

    if (this.state.industry && this.state.type === 'national') searchParams.industry = this.state.industry.industry;

    if (this.state.position && this.state.type === 'national') searchParams.position = this.state.position.position;

    if (this.state.resultsPerPage) searchParams.resultsPerPage = this.state.resultsPerPage.value;
    
    if (offset && this.props.searchResults && !this.props.pagination) searchParams.offset = this.props.searchResults.offset;
    else if (offset) searchParams.offset = (offset*this.props.pageSize);

    searchParams.pagination = this.props.pagination;
    let queryParams;
    queryParams = this.props.addQueryParameters(searchParams, '/main/business-search');

    businessesApi.searchBusinesses(queryParams, this.state.type)
      .then(response => {
        this.props.changeLoadingMessage();
        this.props.changeSearchResults(response.data, 'business', 'businesses', newSearch);
        if (this.state.description) searchParams.description = this.state.description.label;
        if (newSearch)
          searchesApi.saveSearch({
            type: "businessSearch",
            keywords: searchParams.keywords,
            results: response.data.total,
            filters: { ...searchParams, type: this.state.type }
          });
      })
      .catch(() => {
        this.props.finishLoading(true, "An error occured, please try again later");
      });

  }

  render = () =>
    <BusinessSearchParametersPanel

      {...this.props}
      {...this.functions}
      {...this.state}

      searchDescriptions={businessesApi.searchBusinessParameters}
      searchIndusties={parametersApi.searchIndustries}
      searchPositions={parametersApi.searchPositions} />
}

export default BusinessSearchParameters;
