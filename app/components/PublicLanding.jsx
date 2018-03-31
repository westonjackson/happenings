import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';

class PublicLanding extends React.Component {
	render() {
		return (
			<div>
				<div>Welcome to Happenings!</div>
				<SignUpForm />
				<div>Already have an account? <Link to='/login'>Log in here.</Link></div>
			</div>
		)
	}
}

export default PublicLanding;