import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, getState } from 'react-redux';
import AppContainer from './components/AppContainer';
import configureStore from './store/store';
import { getAuth } from './utils/auth.js';
import { getUsername } from './utils/index';
import './styles/index.scss';

let store = configureStore();

// TEST START 
window.getAuth = getAuth;
// TEST END     
    
ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  ),  document.getElementById('app')
);
  


