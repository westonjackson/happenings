import React from 'react';
import HeaderContainer from './HeaderContainer';
import Main from './Main';

class App extends React.Component {
	render() {
		return (
			<div>
				<HeaderContainer />
				<Main />
			</div>
		)
	}
}

export default App;
