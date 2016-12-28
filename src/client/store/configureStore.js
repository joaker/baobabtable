import { createStore, applyMiddleware, compose as plainCompose } from 'redux'
import thunk from 'redux-thunk'
// import promiseMiddleware from 'redux-promise-middleware';
import promiseMiddleware from "./promise";
import * as ActionTypes from 'constants/action-types';
import reducer from 'reducers'

const compose = (isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || plainCompose;

const configureStore = (preloadedState={}) => {
  const store = createStore(
    reducer,
    preloadedState,
    compose(
      applyMiddleware(thunk),
      // add other store enhancers if needed
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore;
