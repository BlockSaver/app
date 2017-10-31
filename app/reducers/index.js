// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import wallet from "./wallet";

const rootReducer = combineReducers({
  counter,
  router,
  wallet,
});

export default rootReducer;
