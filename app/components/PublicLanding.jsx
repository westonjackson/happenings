import React from 'react';
import PropTypes from 'prop-types';
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

PublicLanding.propTypes = {
	userId: PropTypes.string
}

export default PublicLanding;