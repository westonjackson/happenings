import React from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../utils/feed'
import Post from './Post.jsx';

// TODO: put a 'load more posts' button at the bottom
// this button should utilize the pagination callback that is returned by getPaginatedFeed

class PostFeed extends React.Component {
	PAGE_SIZE = 5;
	state = {
		posts: {},
		gotData: false
	}
	componentWillMount() {
		getPosts(this.props.uri, this.PAGE_SIZE).then(data => {
			this.setState({posts: data.entries, gotData: true});
		})
	}
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
			<div>
				<div>{ this.state.gotData && this.addPosts() }</div>
			</div>
		);
	}
}

PostFeed.propTypes = {
	uri: PropTypes.string,
}

export default PostFeed;
