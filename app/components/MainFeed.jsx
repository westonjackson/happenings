import React from 'react';
import PostFeed from './PostFeed';

class MainFeed extends React.Component {
	render() {
		// this is the global posts feed for now.
		const mainFeedURI = '/posts/';
		return (
			<div>
				MY FEED
				<PostFeed
					uri={mainFeedURI}
				/>
			</div>
		)
	}
}

export default MainFeed;