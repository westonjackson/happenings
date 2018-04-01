import React from 'react';
import { loadUserProfile } from '../utils/user';

class ProfilePage extends React.Component {
	state = {
		user: {}
	}
	componentWillMount() {
		loadUserProfile(this.props.match.params.user_id).then(snapshot => {
			const userInfo = snapshot.val();
			if (userInfo) {
				this.setState({
					user: userInfo
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
			// todo - make a custom 404 page
			return (<Redirect to='/'/>);
		}
		return (
			<div>
				{this.state.user.full_name}
			</div>
		)
	}
}

export default ProfilePage;