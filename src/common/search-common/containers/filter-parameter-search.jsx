import React, { Component } from 'react';
import FilterParameterSearchComp from '../components/filter-parameter-search';

class FilterParameterSearch extends Component {
  constructor (props) {
    super(props);
    this.state = {

      currentInput: '',
      options: [],
      isLoading: false
    };

    this.functions = {
      onChange: this.onChange,
      onInputChange: this.onInputChange
    };
  }

  componentDidMount = () => {
    if (this.props.loadOnMount) {
      this.props.searchParameters("")
        .then(response => {
          this.setState({ options: response.data });
        })
        .catch(() => { })
        .finally(() => this.setState({ isLoading: false }));
    }

  }

  onChange = selectedOption => {
    this.props.changeParameters({ [this.props.property]: selectedOption });
  }

  onInputChange = input => {
    if (!this.props.loadOnMount)
      if (input && input.length === 3 && input !== this.state.currentInput) {
        this.setState({ isLoading: true });
        this.props.searchParameters(input)
          .then(response => {
            this.setState({ options: response.data, currentInput: input });
          })
          .catch(() => { })
          .finally(() => this.setState({ isLoading: false }));
      }

      else if (input.length < 3) {
        this.setState({ options: [], currentInput: '' });
      }
  }

  render = () =>
    <FilterParameterSearchComp {...this.props} {...this.state} {...this.functions} />
}

export default FilterParameterSearch;