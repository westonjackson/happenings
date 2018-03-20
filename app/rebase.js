import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyC1lA8fDONZuH00U8J_fUH8IRFJ8hs4fBY",
  authDomain: "happenings-1b935.firebaseapp.com",
  databaseURL: "https://happenings-1b935.firebaseio.com",
  projectId: "happenings-1b935",
  storageBucket: "happenings-1b935.appspot.com",
  messagingSenderId: "1026371810811"
};

var app = firebase.initializeApp(config);
var base = Rebase.createClass(app.database());
export default base;
