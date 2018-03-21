import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import Main from './Main.jsx';

// import all css dependencies here to be bundled by webpack
import './styles/AppStyles.scss';

ReactDOM.render(
  <div>
  	<Main />
  </div>,
  document.getElementById('app')
);
