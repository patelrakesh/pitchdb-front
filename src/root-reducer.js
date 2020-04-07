import { combineReducers } from 'redux';
import homeReducer from './modules/home/duck/reducers';
//import simpleReducer from './simpleReducer';
export default combineReducers({
  home: homeReducer
});