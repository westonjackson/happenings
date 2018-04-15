import React from 'react';
import PropTypes from 'prop-types';
import { getUserFeedPosts } from '../../utils/feed';

import Post from '../post/Post.jsx';

/**
 * Publically viewable page, don't need to be signed in
 */
 
class ProfilePosts extends React.Component {
	state = {
		gotPostsData: false
	}
	componentWillMount() {
		getUserFeedPosts(this.props.uid).then(data => {
			const postIds = Object.keys(data.entries);
			if (postIds.length == 0) {
				this.setState({noPostsToShow: true});
			} else {
				this.setState({posts: data.entries, gotData: true});
			}
		});
	}
	// TODO - make this a different thing that uses a different component
	addPosts() {
		const posts = this.state.posts;
		return Object.keys(posts).map(postId => {
			let postData = posts[postId];
			return (
				<Post
					key={postId}
					id={postId}
					author={postData.author}
					full_storage_uri={postData.full_storage_uri}
					full_url={postData.full_url}
					caption={postData.text}
					thumb_storage_uri={postData.thumb_storage_uri}
					thumb_url={postData.thumb_url}
				/>
			)
		});
	}
	render() {
		return (
			<div>{this.state.gotData && this.addPosts()}</div>
		);
	}
}

ProfilePosts.propTypes = {
	uid: PropTypes.string,
}

export default ProfilePosts;