import React, { Component } from 'react';
import MainPanel from '../components/main-panel';
import cookiesApi from '../../../api/util/cookies-api';
import usersApi from '../../../api/routes/users-api';
import socketsCommon from '../../../api/sockets/sockets-common';
import toastApi from '../../../api/util/toast-api';
import swalApi from '../../../api/util/swal-api';
import axios from 'axios';
import listsApi from '../../../api/routes/lists-api';
import guestsApi from '../../../api/routes/guests-api';
import browserUtil from '../../../common/general/util/browser';

class Main extends Component {

  constructor (props) {
    super(props);
    this.state = {
      user: null,
      selectedSearch: null,
      minimizedNavigation: false,
      refreshHeader: false,
      adminMode: false,
      podcastPlayerData: null,
      loadingMessage: null,
      showChromeExtension: false,

      lists: [],
      // podcastPlayerData: null
    };
    this.functions = {
      signOut: this.signOut,
      changePage: this.changePage,
      addQueryParameters: this.addQueryParameters,
      setUser: this.setUser,
      toggleMenu: this.toggleMenu,
      refresHeader: this.refresHeader,
      setPodcastPlayerData: this.setPodcastPlayerData,
      changeLoadingMessage: this.changeLoadingMessage,
      finishLoading: this.finishLoading,
      dismissExtensionPrompt: this.dismissExtensionPrompt,
      onListChange: this.onListChange
    };
  }

  // Lists
  loadUserLists = () => {
    listsApi.getUserLists(0, true)
      .then(response => {
        this.setState({
          lists: response.data
        });
      })
      .catch(() => {
        this.finishLoading(true, "We could not load your lists, please try again later");
      });
  }

  onListChange = (list, type, item) => {

    if (type === "guest") {
      this.changeLoadingMessage("Fetching emails and adding to list, this may take a few minutes");
      guestsApi.lookUpEmails([item])
        .then(response => {
          this.addItem(list, type, response.data);
        })
        .catch(() => {
          this.finishLoading(true, "An error occured while adding the contact, please try again later.");
        });
    } else {
      this.changeLoadingMessage("Adding contact");
      this.addItem(list, type, [item]);
    }
  }

  addItem = (list, type, items) => {
    listsApi.addItemsToList(list._id, type, items)
      .then(response => {
        console.log(response.status);

        if (response.status !== 200) {
          this.finishLoading(true, "An error occured while adding the contact, please try again later.");
        }
        else {
          this.finishLoading(false, "The contacts were added succesfully");
        }
      })
      .catch(() => {
        this.finishLoading(true, "An error occured while adding the contact, please try again later.");
      });
  }

  signOut = () => {
    cookiesApi.remove("jwt");
    this.props.history.push('/');
  }

  componentDidMount = () => {
    const jwt = cookiesApi.get("jwt");
    axios.defaults.headers.common['Authorization'] = "Bearer " + jwt;
    socketsCommon.setJWT(jwt);
    usersApi.getUserInfo()
      .then(response => {
        this.setState({
          user: response.data,
          adminMode: cookiesApi.get("admin-token") ? true : false
        }, () => {
          this.changePage('dashboard');
          this.loadUserLists();
        });
      })
      .catch(() => {
        this.signOut();
      });
    // this.checkIfExtensionInstalled();
  }

  changePage = (page, back) => {
    this.changeLoadingMessage();
    this.setState({ minimizedNavigation: false });
    if (window.innerWidth <= 960)
      this.setState({ minimizedNavigation: true });
    let currentPage = cookiesApi.get("currentPage");
    let lastPage = cookiesApi.get("lastPage");
    if (page) {
      this.props.history.push("/main/" + page);
      cookiesApi.set("lastPage", currentPage);
      cookiesApi.set("currentPage", page);
    }
    else if (back && lastPage && lastPage !== currentPage) {
      this.props.history.push("/main/" + lastPage);
      cookiesApi.set("currentPage", lastPage);
    }
    else if (!back && !page && currentPage)
      this.props.history.push("/main/" + currentPage);
    else {
      this.props.history.push("/main/podcast-search");
    }

  }

  addQueryParameters = (searchParams, URL) => {
    let queryParams = "";
    for (var property in searchParams) {
      if (searchParams.hasOwnProperty(property)) {
        queryParams += ("&" + property + "=" + searchParams[property]);
      }
    }
    this.props.history.push(URL + '?' + queryParams.substring(1, queryParams.length));
    return queryParams.substring(1, queryParams.length);
  }

  setUser = user => {
    this.setState({ user: user });
  }

  toggleMenu = () => {
    this.setState({ minimizedNavigation: !this.state.minimizedNavigation });
  }

  refresHeader = (refresh, callback) => {
    this.setState({ refreshHeader: refresh }, () => callback());
  }

  setPodcastPlayerData = (data) => {
    this.setState({ podcastPlayerData: data });
  }

  changeLoadingMessage = (message) => {
    this.setState({ loadingMessage: message ? `${message}...` : '' });
  }

  finishLoading = (error, message) => {
    this.setState({ loadingMessage: null }, () => {
      if (error)
        swalApi.error(message);
      else
        toastApi.success(message);
    });
  }

  checkIfExtensionInstalled = () => {
    if (cookiesApi.get('extension-clicked') !== 'true')
      if (!browserUtil.isMobile() && browserUtil.isChrome())
        this.setState({ showChromeExtension: true });
  }

  dismissExtensionPrompt = () => {
    this.setState({ showChromeExtension: false });
    cookiesApi.set('extension-clicked', 'true');
  }

  render = () =>
    <MainPanel {...this.state} {...this.props} {...this.functions} />
}

export default Main;