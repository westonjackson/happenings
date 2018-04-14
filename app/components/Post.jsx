import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toArray } from '../utils/index';
import { fetchComments, registerUserToLike,
	registerForLikesCount, registerForCommentsCount, updateLike
} from '../utils/post';

import PostStats from './post/PostStats.jsx';
import Comment from './Comment.jsx';

// TODO: post timestamp (1hr ago, 2d ago etc)

class Post extends React.Component {
	state = {
		comments: [],
		gotComments: false,
		nextPage: null,
		isLiked: false,
		likeCount: false,
		commentCount: false
	};
	loadPostStats = () => {
		// I need sagas this is messy
		registerUserToLike(this.props.id, isLiked => {
			this.setState({ isLiked });
		});
		registerForLikesCount(this.props.id, likeCount => {
			this.setState({ likeCount });
		});
		registerForCommentsCount(this.props.id, commentCount => {
			this.setState({ commentCount });
		});
	}
	componentWillMount() {
		const postId = this.props.id;
		this.loadPostStats();
		fetchComments(postId).then(data => {
			this.setState({
				comments: toArray(data.entries),
				gotComments: true,
				nextPage: data.nextPage,
			});
		});
	}
	loadMoreComments = () => {
		let currentComments = this.state.comments;
		let callback = this.state.nextPage;
		callback().then(data => {
			this.setState({
				comments: currentComments.concat(toArray(data.entries)),
				gotComments: true,
				nextPage: data.nextPage,
			});
		});
	}
	addCommentsToPost() {
		const commentData = this.state.comments.sort((a, b) => {
			return a.timestamp - b.timestamp
		});
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
		const nextPageBtn = this.state.nextPage ? (
			<div className='more-comments-btn'>
				<span
					className='more-comments-btn text'
					onClick={this.loadMoreComments}
				>~ load more comments ~</span>
			</div>
		) : null;
		const authorLink = (
			<Link to={`/user/${this.props.author.username}`}>
				{this.props.author.username}
			</Link>
		);
		return (
			<div className='post-container'>
				<div className='post-author'>{authorLink}</div>
				<img src={this.props.full_url} height="300" width="300"></img>

				<PostStats
					likeCount={this.state.likeCount}
					commentCount={this.state.commentCount}
					isLiked={this.state.isLiked}
					updateLike={(val) => updateLike(this.props.id, val)}
				/>

				<div className='comments-container'>
					{/*The first comment is the post status!*/}
					<Comment
						author={this.props.author}
						text={this.props.caption}
					/>
					{nextPageBtn}
					{this.addCommentsToPost()}
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