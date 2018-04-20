import React from 'react';
import base from '../utils/rebase';
import { Link } from 'react-router-dom';
import { getAuth, signUserOut } from '../utils/auth';

class Header extends React.Component {
	constructor() {
		super();
		this.auth = getAuth();
		this.database = base.initializedApp.database();
		this.state = {
			loggedIn: !!this.auth.currentUser,
			_isMounted: false
		}
	}
	componentWillMount() {
		this.setState({ _isMounted: true });
	}
	componentWillUnmount() {
		this.setState({ _isMounted: false });
	}
	componentDidMount() {
		this.auth.onAuthStateChanged(user => {
			if (!!user) {
				this.database.ref(`/people/${user.uid}`).once('value').then(snapshot => {
					let userInfo = snapshot.val();
					if (this.state._isMounted) {
						this.setState({
							loggedIn: !!user,
							userInfo: userInfo
						});
					}
				});
			}
		});
	}
	currentUserPath() {
		let username = this.state.userInfo.username;
		return `/user/${username}`;
	}
	render() {
		const logOutBtn = (<div onClick={signUserOut}>Sign out</div>);
		const logInBtn = (<Link to='/login'>Log in</Link>);
		const authLink = this.state.loggedIn ? logOutBtn : logInBtn;

		// TODO: only show these nav links if a user is signed in
		return (
			<div className='nav-bar-container'>
				<div className='header'>HAPPENINGS</div>
				<ul>
					<li><Link to='/'>feed</Link></li>
					<li><Link to='/discover'>discover</Link></li>
			        <li><Link to='/create'>create</Link></li>
					{this.state.loggedIn && (<li><Link to={this.currentUserPath()}>My Profile</Link></li>)}
					<li>{authLink}</li>
				</ul>
			</div>
		)
	}
}

export default Header;