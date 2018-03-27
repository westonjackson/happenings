import React from 'react';
import PropTypes from 'prop-types';
import { signUpNewUser } from '../utils/auth';

class SignUpForm extends React.Component {
	state = {
		email: '',
		emailConfirm: '',
		password: '',
		passwordConfirm: ''
	}

	MIN_PASSWORD_LENGTH = 5;

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	validateEmail = () => {
		return this.state.email == this.state.emailConfirm
	}
	validatePassword = () => {
		return (
			(this.state.password == this.state.confirmPassword)
			&& this.state.password.length > this.MIN_PASSWORD_LENGTH
		);
	}
	// make 'Sign Up' button DISABLED until the truth condition
	// this.validateEmail() && this.validatePassword() is satisfied
	handleSubmit = (event) => {
		event.preventDefault();
		if (this.validateEmail() && this.validatePassword()) {
			signUpNewUser(this.state.email, this.state.password);
		} else {
			console.log('something wrong still not letting u sign up yet');
			this.setState({
				email: '',
				password: '',
				emailConfirm: '',
				passwordConfirm: '',
			});
		}
	}
	render() {
		return (
			<div>
				Sign up with email and password:
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="emailConfirm"
						value={this.state.emailConfirm}
						onChange={this.handleChange}
					/>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<input
						type="password"
						name="passwordConfirm"
						value={this.state.passwordConfirm}
						onChange={this.handleChange}
					/>
					<input
						type="submit"
						value="Submit"
					/>
				</form>
			</div>
		)
	}
}

export default SignUpForm;