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
		const eventsNoun = this.props.numEvents == 1 ? 'event' : 'events';
		const followBtnText = this.props.isFollowing ? 'U R Following' : 'Follow';

		// quick and lazy typechecking to determine if this data has loaded yet
		const numFollowers = typeof(this.props.numFollowers) == "number" ? (
			<div>{`${this.props.numFollowers} ${followNoun}`}</div>
			) : null;
		const numFollowing = typeof(this.props.numFollowing) == "number" ? (
			<div>{`${this.props.numFollowing} following`}</div>
			) : null;

		const settings = (
			<div>{'settings'}</div>
		);
		const followBtn = (
			<div onClick={this.toggleFollow}>{followBtnText}</div>
		);
		const btn = this.props.isCurrUser ? settings : followBtn;
		const buttonDisp = this.props.checkedCurrUser ? btn : null;


		return (
			<div>
				<div>{`${this.props.numEvents} ${eventsNoun}`}</div>
				{numFollowers}
				{numFollowing}
				{buttonDisp}
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
	uid: PropTypes.string,
	checkedCurrUser: PropTypes.bool,
	isCurrUser: PropTypes.bool,
}

export default ProfileStats;