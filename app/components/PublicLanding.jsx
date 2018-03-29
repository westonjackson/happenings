import React from 'react';
import { Link } from 'react-router-dom';

import SignUpForm from './SignUpForm';

// put nav links here
class PublicLanding extends React.Component {
	render() {
		return (
			<div>
				<div>welcome!</div>
				<SignUpForm />
				<div>already have an account? </div><Link to='/login'>Log in here.</Link>
			</div>
		)
	}
}

export default PublicLanding;