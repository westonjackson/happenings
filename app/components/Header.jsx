import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({currentUser, logOut, loggedIn}) => {
	const logOutBtn = (<div onClick={logOut}>Sign out</div>);
	const logInBtn = (<Link to='/login'>Log in</Link>);
	const authLink = loggedIn ? logOutBtn : logInBtn;

	// TODO: only show these nav links if a user is signed in
	return (
		<div className='nav-bar-container'>
			<div className='header'>HAPPENINGS</div>
			<ul>
				<li><Link to='/'>feed</Link></li>
				<li><Link to='/discover'>discover</Link></li>
		        <li><Link to='/create'>create</Link></li>
				{loggedIn && (<li><Link to={`/user/${currentUser.username}`}>My Profile</Link></li>)}
				<li>{authLink}</li>
			</ul>
		</div>
	)
}

export default Header;
