import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './modules/home/containers/home';
import AuthCallback from './modules/home/containers/auth-callback';
import EmailCallback from './modules/main.account.configuration/containers/email-callback';
import Main from './modules/main/containers/main';
import authListener from './api/routes/auth-listener'; // eslint-disable-line no-unused-vars
import cookiesApi from './api/util/cookies-api';
import { toast } from 'react-toastify';
import './common/general/styles/swal-styles.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      authNetwork: null,
      emailAuthNetwork: null
    };

    this.functions = {
      changeAuthNetwork: this.changeAuthNetwork.bind(this),
      changeEmailAuthNetwork: this.changeEmailAuthNetwork.bind(this)
    };

  }

  changeAuthNetwork (authNetwork) {
    this.setState({
      authNetwork: authNetwork
    });
    cookiesApi.set('authNetwork', authNetwork);
  }

  changeEmailAuthNetwork (authNetwork) {
    this.setState({
      emailAuthNetwork: authNetwork
    });
    cookiesApi.set('emailAuthNetwork', authNetwork);
  }

  render = () =>
    <div className="App">
      <Switch>
        <Route exact path={'/'}
          render={(props) => (<Home changeAuthNetwork={this.functions.changeAuthNetwork} {...this.state} {...props} />)} />
        <Route exact path={'/invitation'}
          render={(props) => (<Home invite={true} changeAuthNetwork={this.functions.changeAuthNetwork} {...this.state} {...props} />)} />
        {/* Callbacks */}
        <Route exact path={'/authcallback'}
          render={() => (<AuthCallback {...this.state} />)} />
        <Route exact path={'/emailcallback'}
          render={() => (<EmailCallback {...this.state} />)} />
        <Route path={'/main'}
          render={(props) => (<Main {...this.state} {...props} {...this.functions} />)} />
      </Switch>
    </div>;
}

export default App;
