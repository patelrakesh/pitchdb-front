import React, { Component } from 'react';
import searchParametersApi from '../../../api/routes/search-parameters-api';
import LocationParametersGroup from '../components/location-parameters-group';

class LocationParameters extends Component {
  constructor (props) {
    super(props);
    this.state = {

      citiesList: [],
      statesList: [],
      countriesList: [],

    };

    this.functions = {
      handleCountry: this.handleCountry.bind(this),
      handleState: this.handleState.bind(this),
      handleCity: this.handleCity.bind(this)
    };
  }

  componentDidMount = () => {
    searchParametersApi.getCountries()
      .then(response => {
        this.setState({
          countriesList: response.data
        }, () => this.handleCountry(
          {
            _id: "5b6ee04d6fb38d10da5e509e",
            label: "United States",
            value: "US",
            refId: "231"
          }
        ));
      })
      .catch(() => {
        this.props.finishLoading(true,"Could not load the list of countries");
      });
  }

  handleCountry = selectedCountry => {
    let stateObj = {
      country: selectedCountry
    };
    if (!selectedCountry) {
      stateObj.state = null;
      stateObj.city = null;
    }
    this.props.changeParameters(stateObj);
    this.setState({
      country: selectedCountry,
      statesList: selectedCountry ? this.state.statesList : null,
      citiesList: selectedCountry ? this.state.citiesList : null
    }, () => {
      if (selectedCountry)
        searchParametersApi.getStates(selectedCountry.refId)
          .then(response => {
            this.setState({ statesList: response.data });
          })
          .catch(() => {
            this.props.finishLoading(true,"Could not load the list of states, please try refreshing the page");
          });
    });
  }

  handleState = selectedState => {

    this.props.changeParameters({ state: selectedState });

    if (selectedState)
      searchParametersApi.getCities(selectedState.refId)
        .then(response => {
          this.setState({ citiesList: response.data });
        })
        .catch(() => {
          this.props.finishLoading(true,"Could not load the list of cities, please try refreshing the page");
        });
  }

  handleCity = selectedCity => {
    this.props.changeParameters({ city: selectedCity });
  }

  render = () =>
    <LocationParametersGroup {...this.props} {...this.functions} {...this.state} />
}

export default LocationParameters;