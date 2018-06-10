import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import DrawArea from '../signup/DrawArea';
import { getAuth, handleAuthFailure, updateProfileInfo } from '../../utils/auth';
import { loadUserData } from '../../utils/user';


//TODO: this and SignUpForm.jsx have duplicate code that should be consolidated
class AccountSettings extends React.Component {
	constructor() {
		super();
		this.auth = getAuth();
		this.state = {
			email: '',
			userName: '',
			fullName: '',
			password: '',
			passwordConfirm: ''
		}
	}
	componentDidMount() {
		this.initUserData()
	}
	initUserData = () => {
		if (this.auth.currentUser) {
			this.setState({
				_email: this.auth.currentUser.email
			});
			loadUserData(this.auth.currentUser.uid).then(data => {
				const userData = data.val();
				console.log(userData);
				this.setState({
					_fullName: userData.full_name,
					_userName: userData.username,
					_gotUserData: true
				});
			})
		}
	}
	
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

	updateFailure = (errorMessage) => {
		handleAuthFailure(errorMessage);
		this.setState(this.initialState);
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if(!this.validUserName()) {
			this.updateFailure("Username has capital letters!");
		} else if(!this.validPasswordMatch()) {
			this.updateFailure("Passwords do not match!");
		} else if(!this.validPasswordLength()) {
			this.updateFailure("Password is not long enough!");
		} else {
			const userInfo = this.state;
			updateProfileInfo(userInfo);
		}
	}

	render()  {
		if (!this.auth.currentUser) {
			return (<Redirect to='/'/>);
		}
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					email
					<input
						type="text"
						name="email"
						value={this.state.email}
						defaultValue={this.state._email}
						placeholder="email"
						onChange={this.handleChange}
						className='form-input'
					/>
					handle
					<input
						type="text"
						name="userName"
						value={this.state.userName}
						defaultValue={this.state._userName}
						placeholder="username"
						onChange={this.handleChange}
						className='form-input'
					/>
					display name
					<input
						type="text"
						name="fullName"
						value={this.state.fullName}
						defaultValue={this.state._fullName}
						placeholder="display name"
						onChange={this.handleChange}
						className='form-input'
					/>
					password
					<input
						type="password"
						name="password"
						value={this.state.password}
						placeholder="password (at least 6 characters)"
						onChange={this.handleChange}
						className='form-input'
					/>
					password again
					<input
						type="password"
						name="passwordConfirm"
						value={this.state.passwordConfirm}
						placeholder="confirm password"
						onChange={this.handleChange}
						className='form-input'
					/>

					<section className='draw-container'>
						<label>Redraw icon</label>
						<DrawArea />
					</section>

					<button
						type="submit"
					>Save</button>
				</form>
			</div>
		)
	}
}

AccountSettings.propTypes = {

}

export default AccountSettings;
