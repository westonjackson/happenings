import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({currentUser, logOut, loggedIn}) => {
	const logOutBtn = (<div onClick={logOut}>Sign out</div>);
	const logInBtn = (<NavLink to='/login'>Log in</NavLink>);
	const authLink = loggedIn ? logOutBtn : logInBtn;

	// TODO: only show these nav links if a user is signed in
	return (
		<div className='nav-bar-container'>
			<h1 className='header'>HAPPENINGS</h1>
			<nav className='main-nav'>
				<ul>
					<li><NavLink exact to='/'>Feed</NavLink></li>
					<li><NavLink to='/discover'>Discover</NavLink></li>
					<li><NavLink to='/create'>Create</NavLink></li>
					{loggedIn && (<li><NavLink to={`/user/${currentUser.username}`}>Profile</NavLink></li>)}
					<li>{authLink}</li>
				</ul>
			</nav>
		</div>
	)
}

export default Header;
