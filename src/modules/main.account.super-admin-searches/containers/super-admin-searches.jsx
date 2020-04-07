import React, { Component } from 'react';
import adminSearchesApi from '../../../api/routes/admin-searches-api';

import SuperAdminSearchesPanel from '../components/super-admin-searches-panel';
class SuperAdminSearches extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searches: [],
      page: 0,
      searchesCount: 0,
      pageSize: 0
    };

    this.functions = {
      loadSearches: this.loadSearches,
      handlePageClick: this.handlePageClick
    };
  }

  componentDidMount = () => {
    this.loadSearches();
    this.getSearchesCount();
  }

  loadSearches = (page = 0) => {
    this.props.changeLoadingMessage('Loading');
    adminSearchesApi.getAll(page)
      .then(response => {
        this.setState({
          searches: response.data,
          page
        },
          () => {
            window.scrollTo({
              top: window.document.getElementById('searches-header').offsetTop - 20
            });
            this.props.changeLoadingMessage();
          });
      })
      .catch(() => {
        this.props.finishLoading(true,'Could not load searches data, please try again later');
      });
  }

  getSearchesCount = () => {
    adminSearchesApi.getCount()
      .then(response => {
        this.setState({
          searchesCount: response.data.count,
          pageSize: response.data.pageSize
        });
      })
      .catch(() => { });
  }

  handlePageClick = (data) => {
    this.loadSearches(data.selected);
  }

  render = () => <SuperAdminSearchesPanel {...this.props} {...this.state} {...this.functions} />
}

export default SuperAdminSearches;