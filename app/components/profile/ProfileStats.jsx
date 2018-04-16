import React from 'react';
import PropTypes from 'prop-types';

class ProfileStats extends React.Component {
	toggleFollow = () => {
		const newVal = !this.props.isFollowing;
		this.props.toggleFollow(newVal);
	}
	render() {
		// grammar lol
		const followNoun = this.props.numFollowers == 1 ? 'follower' : 'followers';
		const commentsNoun = this.props.numFollowing == 1 ? 'comment' : 'comments';
		const eventsNoun = this.props.numEvents == 1 ? 'event' : 'events';
		const likeBtnText = this.props.isFollowing ? 'Following' : 'Follow';
		return (
			<div>
				<div>{`${this.props.numEvents} ${eventsNoun}`}</div>
				<div>{`${this.props.numFollowers} ${followNoun}`}</div>
				<div>{`${this.props.numFollowing} ${commentsNoun}`}</div>
				<div onClick={this.toggleFollow}>{likeBtnText}</div>
			</div>
		);
	}
}
ProfileStats.propTypes = {
	numFollowers: PropTypes.number,
	numFollowing: PropTypes.number,
	numEvents: PropTypes.number,
	isFollowing: PropTypes.bool,
	toggleFollow: PropTypes.func,
}

export default ProfileStats;