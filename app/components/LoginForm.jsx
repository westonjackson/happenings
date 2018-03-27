import React from 'react';
import PropTypes from 'prop-types';
import { signInWithEmailAndPassword } from '../utils/auth';

class LoginForm extends React.Component {
	state = {
		email: '',
		password: ''
	};
	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}
	handleSubmit = (event) => {
		event.preventDefault();
		signInWithEmailAndPassword(this.state.email, this.state.password);
	}
	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}
	render () {
		return (
			<div>
				Login with email and password:
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						id="email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						id="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<input
						type="submit"
						value="Submit"
					/>
				</form>
			</div>
		);
	}
}

export default LoginForm;