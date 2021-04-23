import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootSaga from './sagas';
import rootReducer from './reducer';
// import userManager from '../utils/auth/userManager';

const sagaMiddleware = createSagaMiddleware({
  onError: () => {
    // put error handler here to make sure all request without try catch can work smoothly
  }
});
let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
/** * redux middleware */
const middleware = [];
middleware.push(
  loadingBarMiddleware({
    promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'ERROR']
  })
);
// sagaMiddleware
middleware.push(sagaMiddleware);
// loggerMiddleware
if (process.env.NODE_ENV === 'development') middleware.push(loggerMiddleware);

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

// loadUser(store, userManager);
sagaMiddleware.run(rootSaga);

export default store;

export const dispatchAction = action => store.dispatch(action);
