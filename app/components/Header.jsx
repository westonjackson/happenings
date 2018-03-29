import React from 'react';
import { Link } from 'react-router-dom';

// put nav links here
class NavBar extends React.Component {
	render() {
		return (
			<div className='nav-bar-container'>
				<div className='header'>HAPPENINGS</div>
				<ul>
					<li><Link to='/'>feed</Link></li>
					<li><Link to='/discover'>discover</Link></li>
          <li><Link to='/create'>create</Link></li>
					<li><Link to='/signup'>signup</Link></li>
				</ul>
			</div>
		)
	}
}

export default NavBar;