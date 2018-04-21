import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getAuth } from '../../utils/auth';
import { toArray } from '../../utils/index';
import { fetchComments, registerUserToLike,
	registerForLikesCount, registerForCommentsCount, updateLike as _updateLike
} from '../../utils/post';

import PostStats from './PostStats.jsx';
import Comment from './Comment.jsx';

// TODO: post timestamp (1hr ago, 2d ago etc)

class Post extends React.Component {
	auth = getAuth();
	state = {
		comments: [],
		gotComments: false,
		nextPage: null,
	};
	componentWillMount() {
		this.setState({_isMounted: true});
	}
	componentWillUnmount() {
		this.setState({_isMounted: false});
	}
	safeSetState = (state) => {
		if (this.state._isMounted) {
			this.setState(state);
		}
	}
	loadPostStats = () => {
		// I need sagas this is messy
		if (this.auth.currentUser) {
			registerUserToLike(this.props.id, isLiked => {
				this.safeSetState({ isLiked });
			});
		} else {
			this.safeSetState({ isLiked: false});
		}
		registerForLikesCount(this.props.id, likeCount => {
			this.safeSetState({ likeCount });
		});
		registerForCommentsCount(this.props.id, commentCount => {
			this.safeSetState({ commentCount });
		});
	}
	componentDidMount() {
		this.loadPostStats();
		const postId = this.props.id;
		fetchComments(postId).then(data => {
			this.safeSetState({
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
			this.safeSetState({
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
	updateLike(postId, val) {
		if (this.auth.currentUser) {
			_updateLike(postId, val);
		} else {
			// TODO: redirect to the public landing page
			console.log('create an account!');
		}
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
					updateLike={(val) => this.updateLike(this.props.id, val)}
				/>
				<div className='comments-container'>
					{/*The first comment is the post status!*/}
					<Comment
						author={this.props.author}
						text={this.props.caption}
					/>
					{nextPageBtn}
					{this.state.gotComments && this.addCommentsToPost()}
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