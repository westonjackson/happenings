import React from 'react';
import PostFeed from './PostFeed';
import { getAuth } from '../../utils/auth';
import { updateDiscoverFeeds, getDiscoverFeedPosts } from '../../utils/feed';

// the Router will guarantee that this component only mounts if the user is signed in.
class DiscoverFeed extends React.Component {
	constructor() {
		super();
		this.auth = getAuth();
		this.state = {
			posts: {},
			nextPage: null,
			gotPostData: false,
			_isMounted: false
		}
	}
	componentWillMount() {
		this.setState({ _isMounted: true });
		this.initDiscoverFeed();
	}
	componentWillUnmount() {
		this.setState({ _isMounted: false });
	}
	initDiscoverFeed = () => {
		const currentUser = this.auth.currentUser;
		if (currentUser) {
			updateDiscoverFeeds(currentUser.uid).then(() => {
				getDiscoverFeedPosts(currentUser.uid).then(data => {
					const postIds = Object.keys(data.entries);
					if (postIds.length === 0) {
						console.log('no posts! follow sum ppl');
					}
					// TODO: isten for new posts
					// const latestPostId = postIds[postIds.length - 1];
					// subscribeToDiscoverFeed(
					// 	(postId, postValue) => {
					// 		addNewPost(postId, postValue);
					// 	}, latestPostid
					// );
					if (this.state._isMounted) {
						this.setState({
							posts: data.entries,
							nextPage: data.nextPage,
							gotPostData: true
						});
					}
				});
			});
		}
	}
	render() {
		const noPostMsg = 'no posts yet! go follow some people!';
		const ret = Object.keys(this.state.posts).length === 0 ? (
			<div>{noPostMsg}</div>
		) : (
			<PostFeed
				posts={this.state.posts}
				nextPage={this.state.nextPage}
			/>
		);
		return (
			<div>
				<div>DISCOVER</div>
				<div>
					{this.state.gotPostData && ret }
				</div>
			</div>
		)
	}
}

export default DiscoverFeed;