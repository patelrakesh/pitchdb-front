/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import HeaderPanel from '../components/header-panel';
import creditsApi from '../../../api/routes/credits-api';
import cookiesApi from '../../../api/util/cookies-api';

class Header extends Component {

  constructor (props) {
    super(props);
    this.state = {
      menuOpen: false,
      loadingCredits: true,
      remaining: 0
    };
    this.functions = {
      toggleMenu: this.toggleMenu,
      backToAdmin: this.backToAdmin,
    };
  }

  componentDidMount = () => {
    this.getCounterData();
  }

  componentDidUpdate = () => {
    if (this.props.refreshHeader)
      this.props.refresHeader(false, () => {
        this.getCounterData();
      });
  }

  getCounterData = () => {
    this.setState({ loadingCredits: true });
    creditsApi.getCounter()
      .then(response => {
        if(response.data.remaining === null){
          response.data.remaining = 'Unlimited 🎉';
        }
        
        this.setState({ remaining: response.data.remaining },
          () => {
            this.setState({ loadingCredits: false });
          });
      })
      .catch(() => {
        this.props.finishLoading(true, "There was an error loading your pitches");
      });
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  backToAdmin = () => {
    cookiesApi.setUserJWT(cookiesApi.get('admin-token'));
    cookiesApi.remove('admin-token');
    cookiesApi.remove('lastPage');
    cookiesApi.remove('currentPage');
    window.location = 'app.pitchdb.com';
  }

  render = () =>
    <HeaderPanel {...this.props} {...this.state} {...this.functions} />
}

export default Header;
