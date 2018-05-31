import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
		}
	}
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}
	handleSubmit = (event) => {
		event.preventDefault();
		//TODO: make inputs disabled when login is being confirmed by Firebase.
		this.props.login(this.state.email, this.state.password);
	}
	render () {
		if (this.props.loggedIn) {
			return (<Redirect to='/'/>);
		}
		return (
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
						className='form-input'
					/>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
						className='form-input'
					/>
					<button
						type="submit">
						Log In
					</button>

					<p className='form-help-text'>
						Forgot your login information? <a className='underline'>Get help here</a>
					</p>
				</form>
		);
	}
}
export default LoginForm;
