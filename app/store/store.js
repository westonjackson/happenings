import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlesWares = composeEnhancers(applyMiddleware(thunk, logger))

const configureStore = (preloadedState = {}) => {
  return createStore(
    rootReducer,
    preloadedState,
    middlesWares
  )
};

export default configureStore;
