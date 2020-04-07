import React from 'react';
import MediaSearchParametersPanel from '../components/media-search-parameters-panel';
import searchesApi from '../../../api/routes/searches-api';
import mediaApi from '../../../api/routes/media-api';
import async from 'async';

class MediaSearchParameters extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      keywords: "",
      mediaType: [
        {
          optionId: "magazine",
          label: "Magazines"
        },
        {
          optionId: "newspaper",
          label: "Newspapers"
        },
        {
          optionId: "radio",
          label: "Radio"
        },
        {
          optionId: "tvstation",
          label: "TV Stations"
        }
      ],
      positionsList: [],
      genreList: [],
      type: "magazine",
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
      handlePosition: this.handlePosition,
      handleGenre: this.handleGenre,
      handleSelectChangeResultsPerPage: this.handleSelectChangeResultsPerPage,
    };
  }

  componentDidMount = () => {
    this.props.changeLoadingMessage('Loading');
    async.parallel(
      [
        next => {
          this.loadPositions(next);
        },
        next => {
          this.loadGenres(next);
        }
      ],
      (err) => {
        if (err) {
          this.props.finishLoading(true, err.message);
        }
        else {
          this.search(0, false, true);
        }
      }
    );
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentResultsPage !== this.props.currentResultsPage && !this.props.newSearch) {
      this.search(this.props.currentResultsPage - 1, false);
    }
  }

  loadPositions = (next) => {
    if (!next) this.props.changeLoadingMessage('Loading');
    mediaApi.getMediaPositions(`mediaType=${this.state.type}`)
      .then(response => {
        this.setState({
          positionsList: response.data
        }, () => {
          if (next) next();
          else this.props.changeLoadingMessage();
        });
      })
      .catch(() => {
        if (next) next(new Error('An error has occured while loading the parameters'));
        else this.props.finishLoading(true, 'An error has occured while loading the parameters');

      });
  }

  loadGenres = (next) => {
    if (!next) this.props.changeLoadingMessage('Loading');
    mediaApi.getMediaGenres(`mediaType=${this.state.type}`)
      .then(response => {
        this.setState({
          genreList: response.data
        }, () => {
          if (next) next();
          else this.props.changeLoadingMessage();
        });
      })
      .catch(() => {
        if (next) next(new Error('An error has occured while loading the parameters'));
        else this.props.finishLoading(true, 'An error has occured while loading the parameters');
      });
  }

  search = (offset, newSearch, sampleSearch) => {
    this.props.changeLoadingMessage(sampleSearch ? "Loading" : "Searching");

    let searchParams = {};

    if (this.state.keywords) searchParams.keywords = this.state.keywords;
    //if (this.state.country) searchParams.country = this.state.country.label;
    if (this.state.city) searchParams.city = this.state.city.label;
    if (this.state.state) searchParams.state = this.state.state.value;

    if (this.state.position) searchParams.position = this.state.position.position.replace(/&/g, '%26');
    if (this.state.genre && this.state.type === 'magazine') searchParams.magazineGenre = this.state.genre.genre.replace(/&/g, '%26');

    searchParams.mediaType = this.state.type;

    if (this.state.resultsPerPage) searchParams.resultsPerPage = this.state.resultsPerPage.value;
    if (offset && this.props.searchResults && !this.props.pagination) searchParams.offset = this.props.searchResults.offset;
    else if (offset) searchParams.offset = (offset * this.props.pageSize);

    searchParams.pagination = this.props.pagination;
    let queryParams;
    queryParams = this.props.addQueryParameters(searchParams, '/main/media-search');

    mediaApi.search(queryParams)
      .then(response => {

        this.props.changeLoadingMessage();
        this.props.changeSearchResults(response.data, 'mediaOutlet', 'mediaOutlets', newSearch);

        if (newSearch)
          searchesApi.saveSearch({
            type: "mediaOutletSearch",
            keywords: searchParams.keywords,
            results: response.data.total,
            filters: { ...searchParams, type: this.state.type }
          });
      })
      .catch(() => {
        this.props.finishLoading(true, "An error occured, please try again later");
      });
  }

  handlePosition = selectedPosition => {
    this.setState({ position: selectedPosition });
  }

  handleGenre = selectedGenre => {
    this.setState({ genre: selectedGenre });
  }

  handleSelectChangeResultsPerPage = selectedOption => {
    this.setState({ resultsPerPage: selectedOption });
    if (selectedOption) {
      this.props.changePageSize(selectedOption.value);
    } else {
      this.props.changePageSize(20);
    }
  }

  changeParameters = parametersObj => {
    this.setState(parametersObj);
  }

  handleInputChange = event => {
    let propName = event.target.name;
    this.setState({
      [propName]: event.target.value
    }, () => {
      if (propName === 'type') {
        this.setState({ position: null });
        this.loadPositions();
      }
    });
  }

  render = () => <MediaSearchParametersPanel {...this.state} {...this.functions} {...this.props} />
}

export default MediaSearchParameters;