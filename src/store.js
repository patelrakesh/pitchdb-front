import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const middleware = applyMiddleware(thunk, logger);

export default () => {
 return createStore(
  rootReducer,
  middleware
 );
};