import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, getState } from 'react-redux';
import App from './components/App.jsx';
import configureStore from './store/store';
import { getAuth } from './utils/auth.js';
import { getUsername } from './utils/index';
import './styles/index.scss';

if (window.currentUser) {
  getUsername(auth.currentUser.uid).then(data => {
      let username = data.val();
      const preloadedState = {
        session: { currentUser: { username, uid, email }}
      };  
      store = configureStore(preloadedState);
      
      //TEST START
      window.getState = store.getState;
      window.getAuth = getAuth;
      //TEST END
      
      ReactDOM.render((
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
        ),  document.getElementById('app')
      );
  });
}

let store = configureStore();
    
ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ),  document.getElementById('app')
);
  


