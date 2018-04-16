import React from 'react';
import { Redirect } from 'react-router-dom';
import { loadUserData, registerForFollowersCount, registerForFollowingCount,
getUserPosts } from '../../utils/user';
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
	componentDidMount() {
		loadUserData(this.props.match.params.username).then(snapshot => {
			const userInfo = snapshot.val();
			if (userInfo) {
				const uid = Object.keys(userInfo)[0]; //s im sorry
				this.setState({
					user: userInfo[uid],
					uid: uid,
					gotUserInfo: true
				});
				// after getting base user info,
				// get following and follower info
				this.loadUserStats(this.state.uid);

			} else {
				console.error('404 not found');
				this.setState({
					userNotFound: true
				});
			}
		});
	}
	loadUserStats(uid) {
		registerForFollowersCount(uid, numFollowers => this.setState({ numFollowers }));
		registerForFollowingCount(uid, numFollowing => this.setState({ numFollowing }));
		const numPosts = this.state.user.hasOwnProperty('posts') ? (
			Object.keys(this.state.user.posts).length
			) : 0;
		this.setState({ numPosts });
		this.setState({ gotUserStats: true });
	}
	render() {
		if (this.state.userNotFound) {
			// TODO - make a custom 404 page
			return (<Redirect to='/'/>);
		} else {
			return (
				<div>
					<div>{this.state.user.full_name} ({this.state.user.username})</div>
					<div>
						{`followers: ${this.state.numFollowers}`}
					</div>
					<div>
						{`following: ${this.state.numFollowing}`}
					</div>
					<div>
						{`posts: ${this.state.numPosts}`}
					</div>
					{ this.state.gotUserInfo && 
						<ProfilePosts
							uid={this.state.uid}
						/>
					}
				</div>
			)
		}
	}
}

export default ProfilePage;