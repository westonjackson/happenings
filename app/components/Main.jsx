import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainFeed from './MainFeed';
import DiscoverFeed from './DiscoverFeed';
import SignUpForm from './SignUpForm';

class Main extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={MainFeed} />
				<Route path='/discover' component={DiscoverFeed} />
				<Route path='/signup' component={SignUpForm} />
			</Switch>
		)
	}
}

export default Main;