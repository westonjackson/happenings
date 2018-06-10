import React from 'react';
import PropTypes from 'prop-types';
import { signUpNewUser, handleAuthFailure } from '../utils/auth';
import DrawArea from './signup/DrawArea';

class SignUpForm extends React.Component {
	initialState = {
		email: '',
		userName: '',
		fullName: '',
		password: '',
		passwordConfirm: ''
	}
	state = this.initialState;

	MIN_PASSWORD_LENGTH = 6;

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	validUserName = () => {
		return this.state.userName == this.state.userName.toLowerCase();
	}

	validPasswordMatch = () => {
		return this.state.password == this.state.passwordConfirm;
	}

	validPasswordLength = () => {
		return this.state.password.length >= this.MIN_PASSWORD_LENGTH;
	}

	signUpFailure = (errorMessage) => {
		handleAuthFailure(errorMessage);
		this.setState(this.initialState);
	}

	// TODO make 'Sign Up' button DISABLED until the truth condition
	handleSubmit = (event) => {
		event.preventDefault();
		if(!this.validUserName()) {
			this.signUpFailure("Username has capital letters!");
		} else if(!this.validPasswordMatch()) {
			this.signUpFailure("Passwords do not match!");
		} else if(!this.validPasswordLength()) {
			this.signUpFailure("Password is not long enough!");
		} else {
			const userInfo = this.state;
			signUpNewUser(userInfo);
		}
	}
	render() {
		return (
			<div>
				Create your account
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="email"
						value={this.state.email}
						placeholder="Email"
						onChange={this.handleChange}
						className='form-input'
					/>
					<input
						type="text"
						name="userName"
						value={this.state.userName}
						placeholder="Username"
						onChange={this.handleChange}
						className='form-input'
					/>
					<input
						type="text"
						name="fullName"
						value={this.state.fullName}
						placeholder="Full Name"
						onChange={this.handleChange}
						className='form-input'
					/>
					<input
						type="password"
						name="password"
						value={this.state.password}
						placeholder="Password (min 6 chars)"
						onChange={this.handleChange}
						className='form-input'
					/>
					<input
						type="password"
						name="passwordConfirm"
						value={this.state.passwordConfirm}
						placeholder="Confirm Password"
						onChange={this.handleChange}
						className='form-input'
					/>

					<section className='draw-container'>
						<label>Icon</label>
						<DrawArea />
					</section>

					<button
						type="submit"
					>Sign Up</button>
				</form>

			</div>
		)
	}
}

export default SignUpForm;
