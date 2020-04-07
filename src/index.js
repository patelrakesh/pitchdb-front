import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { unregister } from './register-service-worker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store';

ReactDOM.render((
  <Provider store={configureStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

unregister();

