import React from 'react';
import PostFeed from './PostFeed';
import { getAuth } from '../utils/auth';

// the Router will guarantee that this component only mounts if the user is signed in.
class DiscoverFeed extends React.Component {
	constructor() {
		super();
		this.auth = getAuth();
	}
	render() {
		const uri = `/feed/${this.auth.currentUser.uid}`
		return (
			<div>
				DISCOVER
				<PostFeed uri={uri}/>
			</div>
		)
	}
}

export default DiscoverFeed;