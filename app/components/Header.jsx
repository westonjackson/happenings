import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signUserOut } from '../utils/auth';

class Header extends React.Component {
	constructor() {
		super();
		this.auth = getAuth();
		this.state = {
			loggedIn: !!this.auth.currentUser
		}
	}
	componentDidMount() {
		this.auth.onAuthStateChanged(user => this.setState({loggedIn: !!user}));
	}
	render() {
		const logOutBtn = (<div onClick={signUserOut}>Sign out</div>);
		const logInBtn = (<Link to='/login'>Log in</Link>);
		const authLink = this.state.loggedIn ? logOutBtn : logInBtn;

		return (
			<div className='nav-bar-container'>
				<div className='header'>HAPPENINGS</div>
				<ul>
					<li><Link to='/'>feed</Link></li>
					<li><Link to='/discover'>discover</Link></li>
			        <li><Link to='/create'>create</Link></li>
					<li>{authLink}</li>
				</ul>
			</div>
		)
	}
}

export default Header;