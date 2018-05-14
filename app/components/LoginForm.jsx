import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { signInWithEmailAndPassword, getAuth } from '../utils/auth';

class LoginForm extends React.Component {
	constructor() {
		super();
		this.auth = getAuth();
		this.state = {
			email: '',
			password: '',
			loggedIn: !!this.auth.currentUser,
			_isMounted: false
		}
	}
	componentWillMount() {
		this.setState({_isMounted: true});
	}
	componentWillUnmount() {
		this.setState({_isMounted: false});
	}
	safeSetState = (state) => {
		if (this.state._isMounted) {
			this.setState(state);
		}
	}
	componentDidMount() {
		this.auth.onAuthStateChanged(user => {
			this.safeSetState({loggedIn: !!user})
		});
	}
	handleChange = (event) => {
		this.safeSetState({
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
		if (this.state.loggedIn) {
			return (<Redirect to='/'/>);
		}
		return (
			<div>
				Login with email and password:
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<input
						type="password"
						name="password"
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
