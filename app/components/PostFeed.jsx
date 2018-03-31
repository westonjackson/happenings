import React from 'react';
import base from '../utils/rebase';
import { getPaginatedFeed } from '../utils/'
// import { PAGE_SIZE } from './constants/'

import Post from './Post.jsx';

// right now this is just loading an initial batch of posts for the DB
// eventually this should be the feed where you see posts from people you follow.

class Main extends React.Component {
	PAGE_SIZE = 5;
	state = {
		posts: {},
		gotData: false
	}
	componentWillMount() {
		this.getGeneralFeed()
	}
	// getGeneralFeed = () => {
	// 	base.fetch('posts', {
	// 		context: this,
	// 		asArray: true,
	// 	}).then(data => {
	// 		this.setState({posts: data, gotData: true});
	// 	}).catch(error => {
	// 		console.log('getGeneralFeed() failed.')
	// 	});
		// TODO: also subscribe to this endpoint
		// maybe re-base has a subscribe method that won't push new posts but only listen for new ones
		//subscribeToGeneralFeed(postId, postValue) => this.addNewPost(postId, postValue, latestPostId);
	// }
	getGeneralFeed = () => {
		this.getPosts().then(data => {
			this.setState({posts: data.entries, gotData: true});
		});
	}
	getPosts() {
		return getPaginatedFeed('/posts/', this.PAGE_SIZE)
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

export default Main;