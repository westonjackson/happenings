import React from 'react';
import { loadUserProfile } from '../utils/user';

/**
 * Publically viewable page, don't need to be signed in
 */
 
class ProfilePage extends React.Component {
	state = {
		user: {}
	}
	componentWillMount() {
		loadUserProfile(this.props.match.params.user_id).then(snapshot => {
			const userInfo = snapshot.val();
			if (userInfo) {
				this.setState({
					user: userInfo,
					gotUserInfo: true
				})
			} else {
				console.error('404 not found');
				this.setState({
					userNotFound: true
				});
			}

		});
	}
	render() {
		if (this.state.userNotFound) {
			// TODO - make a custom 404 page
			return (<Redirect to='/'/>);
		}
		return (
			<div>
				{this.state.gotUserInfo && this.state.user.full_name}
			</div>
		)
	}
}

export default ProfilePage;