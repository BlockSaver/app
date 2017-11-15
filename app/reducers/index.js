// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import wallet from './wallet';
import savings from './savings';

const rootReducer = combineReducers({
  router,
  wallet,
  savings,
});

export default rootReducer;
