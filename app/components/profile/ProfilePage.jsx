import React from 'react';
import { Redirect } from 'react-router-dom';
import { loadUserData, registerForFollowersCount, registerForFollowingCount,
getUserPosts, trackFollowStatus, updateFollow } from '../../utils/user';
import { getAuth } from '../../utils/auth';

import ProfilePosts from './ProfilePosts';
import ProfileStats from './ProfileStats.jsx';

/**
 * Publically viewable page, don't need to be signed in. Will redirect to
 * public landing if 'like' or 'follow' is clicked with no signed in user.
 */
 
class ProfilePage extends React.Component {
	constructor() {
		super();
		this.auth = getAuth();
		this.state = {
			user: {}
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.pathname != this.props.location.pathname) {
			// TODO: more elegant way of handling this.
			window.location.reload();
		}
	}
	componentWillMount() {
		this.setState({ _isMounted: true });
	}
	componentWillUnmount() {
		this.setState({ _isMounted: false });
	}
	componentDidMount() {
		this.initUserPage();
	}
	safeSetState = (state) => {
		if (this.state._isMounted) {
			this.setState(state)
		}
	}
	initUserPage() {
		loadUserData(this.props.match.params.username).then(snapshot => {
			const userInfo = snapshot.val();
			if (userInfo) {
				const uid = Object.keys(userInfo)[0]; //s im sorry
				this.safeSetState({
					user: userInfo[uid],
					uid: uid,
					gotUserInfo: true
				});
				this.loadUserStats(this.state.uid);
				this.loadFollowStatus(this.state.uid);
			} else {
				console.error('404 not found');
				this.safeSetState({	
					userNotFound: true
				});
			}
		});
	}
	loadUserStats(uid) {
		registerForFollowersCount(uid, numFollowers => this.safeSetState({ numFollowers }));
		registerForFollowingCount(uid, numFollowing => this.safeSetState({ numFollowing }));
		const numPosts = this.state.user.hasOwnProperty('posts') ? (
			Object.keys(this.state.user.posts).length
			) : 0;
		this.safeSetState({ numPosts });
		this.safeSetState({ gotUserStats: true });
	}
	toggleFollow = (val) => {
		if (this.auth.currentUser) {
			updateFollow(this.state.uid, val);
		} else {
			console.log('get an account!');
			// TODO Redirect
		}
	}
	loadFollowStatus(uid) {
		trackFollowStatus(uid, data => {
			this.safeSetState({ isFollowing: !!data.val() });
		});
	}
	render() {
		if (this.state.userNotFound) {
			// TODO - make a custom 404 page
			return (<Redirect to='/'/>);
		}
		return (
			<div>
				<div>{this.state.user.full_name} ({this.state.user.username})</div>
				<ProfileStats
					numFollowers={this.state.numFollowers}
					numFollowing={this.state.numFollowing}
					numEvents={this.state.numPosts}
					isFollowing={this.state.isFollowing}
					toggleFollow={this.toggleFollow}
				/>
				{ this.state.gotUserInfo && 
					<ProfilePosts
						uid={this.state.uid}
					/>
				}
			</div>
		)
	}
}

export default ProfilePage;