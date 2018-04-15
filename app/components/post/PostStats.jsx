import React from 'react';
import PropTypes from 'prop-types';

class PostStats extends React.Component {
	updateLike = () => {
		const newVal = !this.props.isLiked;
		this.props.updateLike(newVal);
	}
	render() {
		// grammar lol
		const likesNoun = this.props.likeCount == 1 ? 'like' : 'likes';
		const commentsNoun = this.props.commentCount == 1 ? 'comment' : 'comments';
		const likeBtnText = this.props.isLiked ? 'Liked' : 'Like';
		const attendBtnTxt = this.props.isAttending ? 'Attending' : 'Attend';
		return (
			<div>
				<div>{`${this.props.likeCount} ${likesNoun}`}</div>
				<div>{`${this.props.commentCount} ${commentsNoun}`}</div>
				<div onClick={this.updateLike}>{likeBtnText}</div>
			</div>
		);
	}
}
PostStats.propTypes = {
	likeCount: PropTypes.number,
	commentCount: PropTypes.number,
	isLiked: PropTypes.bool,
	updateLike: PropTypes.func,
	updateAttending: PropTypes.func
}

export default PostStats;