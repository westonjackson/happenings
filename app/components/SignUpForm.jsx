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

	MIN_PASSWORD_LENGTH = 6;

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	validateEmail = () => {
		return (this.state.email == this.state.emailConfirm);
	}
	validatePassword = () => {
		return (
			(this.state.password == this.state.passwordConfirm) &&
			(this.state.password.length >= this.MIN_PASSWORD_LENGTH)
		)
	}
	// make 'Sign Up' button DISABLED until the truth condition
	// this.validateEmail() && this.validatePassword() is satisfied
	handleSubmit = (event) => {
		event.preventDefault();
		if (this.validateEmail() && this.validatePassword()) {
			signUpNewUser(this.state.email, this.state.password);
		} else {
			console.log(this.state.password);
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
						placeholder="email"
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="emailConfirm"
						value={this.state.emailConfirm}
						placeholder="confirm email"
						onChange={this.handleChange}
					/>
					<input
						type="password"
						name="password"
						value={this.state.password}
						placeholder="password (at least 6 characters)"
						onChange={this.handleChange}
					/>
					<input
						type="password"
						name="passwordConfirm"
						value={this.state.passwordConfirm}
						placeholder="confirm password"
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