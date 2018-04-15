import React from 'react';
import { Redirect } from 'react-router-dom';
import { loadUserData, registerForFollowersCount, registerForFollowingCount,
getUserPosts } from '../utils/user';

import ProfilePosts from './ProfilePosts';

/**
 * Publically viewable page, don't need to be signed in
 */
 
class ProfilePage extends React.Component {
	state = {
		user: {}
	}
	componentDidMount() {
		loadUserData(this.props.match.params.username).then(snapshot => {
			const userInfo = snapshot.val();
			if (userInfo) {
				const uid = Object.keys(userInfo)[0]; // im sorry
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