import { reducer } from 'redux-oidc';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { combineReducers } from 'redux';

/** * reducers */

const rootReducer = combineReducers({
  auth: reducer,
  loadingBar: loadingBarReducer
});

export default rootReducer;
