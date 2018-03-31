import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import base from '../utils/rebase';

import MainFeed from './MainFeed';
import DiscoverFeed from './DiscoverFeed';
import SignUpForm from './SignUpForm';
import PublicLanding from './PublicLanding';
import LoginForm from './LoginForm';

class Main extends React.Component {
	constructor() {
		super();
		this.auth = base.initializedApp.auth();
		this.state = {
			loggedIn: false,
			gotAuth: false
		}
	}
	componentWillMount() {
		this.auth.onAuthStateChanged(user => this.onAuthStateChanged(user));
	}
	onAuthStateChanged = (user) => {
		this.setState({
			loggedIn: !!(user),
			gotAuth: true
		});
	}
	render() {
		const loader = (<div>loading...</div>); // TODO
		const ret = (
			<Switch>
				<Route exact path='/' render={() => (
					this.state.loggedIn ? (<MainFeed />) : (<PublicLanding />)
				)} />
				<Route path='/discover' component={DiscoverFeed} />
				<Route path='/signup' component={SignUpForm} />
				<Route path='/login' component={LoginForm} />
			</Switch>
		);
		return (this.state.gotAuth ? ret : loader)
	}
}

export default Main;