import React from 'react';
import PostFeed from './PostFeed';

class MainFeed extends React.Component {
	render() {
		return (
			<div>
				MY FEED
				<PostFeed />
			</div>
		)
	}
}

export default MainFeed;