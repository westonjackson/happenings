import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import Main from './Main.jsx';

const title = 'WHATS HAPPENING';
var config = {
  apiKey: "AIzaSyC1lA8fDONZuH00U8J_fUH8IRFJ8hs4fBY",
  authDomain: "happenings-1b935.firebaseapp.com",
  databaseURL: "https://happenings-1b935.firebaseio.com",
  projectId: "happenings-1b935",
  storageBucket: "happenings-1b935.appspot.com",
  messagingSenderId: "1026371810811"
};
firebase.initializeApp(config);
ReactDOM.render(
  <div>
  	<Main />
  </div>,
  document.getElementById('app')
);
