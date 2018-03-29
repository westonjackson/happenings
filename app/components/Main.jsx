import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import base from '../rebase';

import MainFeed from './MainFeed';
import DiscoverFeed from './DiscoverFeed';
import SignUpForm from './SignUpForm';
import PublicLanding from './PublicLanding';
import LoginForm from './LoginForm';

class Main extends React.Component {
	render() {
		const loggedIn = false; // FOR DEV

		// console.log(base.initializedApp.auth().currentUser);
		return (
			<Switch>
				<Route exact path='/' render={() => (
					loggedIn ? (<MainFeed />) : (<PublicLanding />)
				)} />
				<Route path='/discover' component={DiscoverFeed} />
				<Route path='/signup' component={SignUpForm} />
				<Route path='/login' component={LoginForm} />
			</Switch>
		)
	}
}

export default Main;