import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUserPosts, trackFollowStatus, updateFollow } from '../../utils/user';
import { getAuth } from '../../utils/auth';
import { getUsername } from '../../utils/index';

import ProfilePosts from './ProfilePosts';
import ProfileStats from './ProfileStats.jsx';

/**
 * Publically viewable page, don't need to be signed in. Will redirect to
 * public landing if 'like' or 'follow' is clicked with no signed in user.
 */

class ProfilePage extends React.Component {
	constructor() {
		super();
		this.state = {
			user: {},
			gotUserInfo: false
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.username != this.props.match.params.username) {
			this.props.removeListener('people');
			this.props.removeListener('followers');
			this.initUserPage(nextProps.match.params.username);
		}
	}

	componentDidMount() {
		this.initUserPage(this.props.match.params.username)
	}

	initUserPage(username) {
		this.props.fetchUserByUsername(this.props.match.params.username).then(() => {
			//have to wait until we fetch user to create fb listeners (need uid)
			this.props.listenToFollowers(this.props.user.uid);
			this.props.listenToFollowing(this.props.user.uid);
		});
	}

	componentWillUnmount() {
		//need to unmount fb listeners on component unmount
		this.props.removeListener('people')
		this.props.removeListener('followers')
	}

	toggleFollow = (val) => {
		if (this.props.loggedIn) {
			updateFollow(this.props.user.uid, val);
		} else {
			console.log('get an account!');
			// TODO Redirect
		}
	}

	render() {
		const { currentUser, followerCount, followingCount, user} = this.props;

		if (!user) {
			return <h1>loadin</h1>
		}

    let isCurrUser = false;
		let numEvents = 0;
    if (currentUser && currentUser.uid === user.uid) {
      isCurrUser = true;
    }
		if (user.posts) {
			numEvents = Object.keys(user.posts).length;
		}
		// TODO fix is following (put in container)
		return (
			<div>
				{
					<div>
					{user.full_name} ({user.username})
						<ProfileStats
							numFollowers={followerCount}
							numFollowing={followingCount}
							numEvents={numEvents}
							isFollowing={this.state.isFollowing}
							toggleFollow={this.toggleFollow}
							uid={user.uid}
							isCurrUser={isCurrUser}
						/>
						<ProfilePosts
							uid={user.uid}
						/>
					</div>
				}
			</div>
		)
	}
}

export default ProfilePage;
