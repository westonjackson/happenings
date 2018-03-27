import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import PostFeed from './components/PostFeed.jsx';
import LoginForm from './components/LoginForm';

// import all css dependencies here to be bundled by webpack
import './styles/App.scss';

// eventually, hierarchy should be
// Main component
// inside main component are containers for all pages + router
// feed pages reuse the PostFeed component

ReactDOM.render(
  <div>
	<LoginForm />
  	<PostFeed />
  </div>,
  document.getElementById('app')
);
