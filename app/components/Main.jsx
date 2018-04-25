import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getAuth } from '../utils/auth';

import MainFeed from './feed/MainFeed.jsx';
import DiscoverFeed from './feed/DiscoverFeed.jsx';
import SignUpForm from './SignUpForm.jsx';
import PublicLanding from './PublicLanding.jsx';
import LoginForm from './LoginForm.jsx';
import ProfilePage from './profile/ProfilePage.jsx';
import PostPage from './PostPage.jsx';
import AccountSettings from './account_settings/AccountSettings.jsx';

class Main extends React.Component {
	constructor() {
		super();
		this.auth = getAuth();
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
				<Route path='/discover' render={() => (
					this.state.loggedIn ? (<DiscoverFeed />) : (<PublicLanding />)
				)} />
				<Route path='/signup' component={SignUpForm} />
				<Route path='/login' component={LoginForm} />
				<Route path='/user/:username' component={ProfilePage} />
				<Route path='/event/:event_id' component={PostPage} />
				<Route path='/settings' component={AccountSettings} />
			</Switch>
		);
		return (this.state.gotAuth ? ret : loader)
	}
}

export default Main;