import React from 'react';
import PropTypes from 'prop-types';
import { getPaginatedFeed } from '../utils/';
import Comment from './Comment.jsx';

class Post extends React.Component {
	COMMENTS_PAGE_SIZE = 3;
	state = {
		comments: {},
		gotComments: false
	};
	componentWillMount() {
		const postId = this.props.id;
		this.fetchComments(postId).then(data => {
			this.setState({
				comments: data.entries,
				gotComments: true
			});
		});
	}
	// TODO: Subscribe to new comments
	fetchComments(postId) {
		return getPaginatedFeed(`/comments/${postId}`, this.COMMENTS_PAGE_SIZE, null, false);
	}
	addComments() {
		const commentData = this.state.comments;
		return Object.keys(commentData).map(key => {
			const comment = commentData[key];
			return (
				<Comment
					key={key}
					author={comment.author}
					text={comment.text}
				/>
			)
		});
	}
	render() {
		console.log(this.state.comments);
		const caption = (
			<Comment
				author={this.props.author}
				text={this.props.caption}
			/>			
		);
		return (
			<div className='post-container'>
				<div className='post-author'>{this.props.author.full_name}</div>
				<img src={this.props.full_url} height="300" width="300"></img>
				<div className='comments-container'>
					{caption}
					{this.state.gotComments && this.addComments()}
				</div>
			</div>
		)
	}
}

Post.propTypes = {
	id: PropTypes.string,
	author: PropTypes.object,
	full_storage_uri: PropTypes.string,
	full_url: PropTypes.string,
	caption: PropTypes.string,
	thumb_storage_uri: PropTypes.string,
	timestamp: PropTypes.number,
};

export default Post;