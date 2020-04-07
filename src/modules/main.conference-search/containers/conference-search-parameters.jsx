/* eslint-disable linebreak-style */
import React from 'react';
import ConferenceSearchParametersPanel from '../components/conference-search-parameters-panel';
import searchesApi from '../../../api/routes/searches-api';
import conferenceApi from '../../../api/routes/conference-api';

const NUM_MARKS = 10;

class ConferenceSearchParameters extends React.Component {


  constructor (props) {
    super(props);
    this.state = {
      keywords: "",
      categoryList: [],
      dateAfter: null,
      dateBefore: null,
      defaultEstAudience: [],
      estAudience: [],
      maxAudience: 0,
      unknownAudience: true,
      marks: [],
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
      changeParameters: this.changeParameters,
      handleInputChange: this.handleInputChange,
      handleCategory: this.handleCategory,
      handleEstAudience: this.handleEstAudience,
      handleUnknownAudienceCheckbox: this.handleUnknownAudienceCheckbox,
      handleAfterDateChange: this.handleAfterDateChange,
      handleBeforeDateChange:this.handleBeforeDateChange,
      handleSelectChangeResultsPerPage: this.handleSelectChangeResultsPerPage,
    };
  }

  componentDidMount = () => {
    this.loadCategories();
    this.getMaxAudience();
    this.search(0, false, true);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentResultsPage !== this.props.currentResultsPage && !this.props.newSearch) {
      this.search(this.props.currentResultsPage - 1, false);
    }
  }

  loadCategories = () => {
    this.props.changeLoadingMessage('Loading');
    conferenceApi.getConferenceCategories()
      .then(response => {
        this.setState({
          categoryList: response.data
        }, () => this.props.changeLoadingMessage());
      })
      .catch(() => {
        this.props.finishLoading(true, 'An error has occured while loading the parameters');
      });
  }

  getMaxAudience = () => {
    this.props.changeLoadingMessage('Loading');
    conferenceApi.getMaxAudience()
      .then(response => {
        let marks = [];
        // let maxAudience = response.data[0].max;
        let maxAudience = 5000;
        // let interval = maxAudience/NUM_MARKS;
        let interval = 5000/NUM_MARKS;
        let currentIntervalValue = 0;
        
        for (let i = 0; i <= NUM_MARKS; i++){
          marks.push({value: currentIntervalValue, label: currentIntervalValue.toString()});
          currentIntervalValue += interval;
        }

        // let defaultEstAudience = [marks[1].value - 1000, marks[NUM_MARKS-1].value + 1000];
        let defaultEstAudience = [0, 5000];
        this.setState({
          maxAudience,
          marks,
          defaultEstAudience,
          estAudience: defaultEstAudience
        }, () => this.props.changeLoadingMessage());
      })
      .catch(() => {
        this.props.finishLoading(true, 'An error has occured while loading the parameters');
      });
  }

  search = (offset, newSearch, sampleSearch) => {
    this.props.changeLoadingMessage(sampleSearch ? "Loading" : "Searching");

    let searchParams = {};

    if (this.state.keywords) searchParams.keywords = this.state.keywords;
    if (this.state.city) searchParams.city = this.state.city.label;
    else if (this.state.state) searchParams.state = this.state.state.value;
    else if (this.state.country) searchParams.country = this.state.country.label;

    if (this.state.category) searchParams.category = this.state.category.category;

    if(this.state.estAudience[0] !== this.state.defaultEstAudience[0]) searchParams.estAudienceMin = this.state.estAudience[0];
    if(this.state.estAudience[1] !== this.state.defaultEstAudience[1]) searchParams.estAudienceMax = this.state.estAudience[1];

    if (this.state.dateAfter !== null) searchParams.dateAfter = this.state.dateAfter;
    if (this.state.dateBefore !== null) searchParams.dateBefore = this.state.dateBefore;

    if(!this.state.unknownAudience) searchParams.noUnknownAudience = true;

    if (this.state.resultsPerPage) searchParams.resultsPerPage = this.state.resultsPerPage.value;
    if (offset && this.props.searchResults && !this.props.pagination) searchParams.offset = this.props.searchResults.offset;
    else if (offset) searchParams.offset = (offset * this.props.pageSize);

    searchParams.pagination = this.props.pagination;
    let queryParams;
    queryParams = this.props.addQueryParameters(searchParams, '/main/conference-search');

    conferenceApi.search(queryParams)
      .then(response => {

        this.props.changeLoadingMessage();
        this.props.changeSearchResults(response.data, 'conference', 'conferences', newSearch);

        if (newSearch)
          searchesApi.saveSearch({
            type: "conferenceSearch",
            keywords: searchParams.keywords,
            results: response.data.total,
            filters: { ...searchParams }
          });
      })
      .catch(() => {
        this.props.finishLoading(true, "An error occured, please try again later");
      });
  }

  handleCategory = selectedCategory => {
    this.setState({ category: selectedCategory });
  }

  handleEstAudience = (event, newValue) => {
    this.setState({ estAudience: newValue });
  };

  handleUnknownAudienceCheckbox = event => {
    this.setState({unknownAudience: event.target.checked});
  }

  handleBeforeDateChange = newValue => {
    this.setState({ dateBefore: new Date(newValue.getFullYear(), newValue.getMonth()) });
  }

  handleAfterDateChange = newValue => {
    this.setState({ dateAfter: new Date(newValue.getFullYear(), newValue.getMonth()) });
  }

  changeParameters = parametersObj => {
    this.setState(parametersObj);
  }

  handleInputChange = event => {
    let propName = event.target.name;
    this.setState({
      [propName]: event.target.value
    });
  }

  handleSelectChangeResultsPerPage = selectedOption => {
    this.setState({ resultsPerPage: selectedOption });
    if (selectedOption) {
      this.props.changePageSize(selectedOption.value);
    } else {
      this.props.changePageSize(20);
    }
  }

  render = () => <ConferenceSearchParametersPanel {...this.state} {...this.functions} {...this.props} />
}

export default ConferenceSearchParameters;