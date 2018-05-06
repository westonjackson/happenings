import React from 'react';
import PostFeed from './PostFeed';
import { getPosts } from '../../utils/feed';
import { getAuth } from '../../utils/auth';

// TODO: Rename this to TimelineFeed or something
class MainFeed extends React.Component {
	constructor() {
		super();
		this.auth = getAuth();
		this.URI = '/posts/';
		this.PAGE_SIZE = 5;
		this.state = {
			posts: {},
			nextPage: null,
			gotPostData: false,
			_isMounted: false,
		}
	}
	componentWillMount() {
		this.setState({ _isMounted: true });
	}
	componentWillUnmount() {
		this.setState({ _isMounted: false });
	}
	componentDidMount() {
		getPosts(this.URI, this.PAGE_SIZE).then(data => {
			if (this.state._isMounted) {
				this.setState({
					posts: data.entries,
					gotPostData: true,
					nextPage: data.nextPage,
				});
			}
		});
	}
	render() {
		const postFeed = (
			<PostFeed
				posts={this.state.posts}
				nextPage={this.state.nextPage}
			/>
		);
		return (
			<div>
				{this.state.gotPostData && postFeed}
			</div>
		);
	}
}

export default MainFeed;