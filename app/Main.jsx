import React from 'react';
import firebase from 'firebase';

class Main extends React.Component {
	state = {
		people: []
	}
	componentWillMount = () => {
	  this.firebaseRef = firebase.database().ref('people');
	  this.firebaseRef.limitToLast(100).on('value', function(dataSnapshot) {
	    var items = [];
	    dataSnapshot.forEach(function(childSnapshot) {
	      var item = childSnapshot.val();
	      item['.key'] = childSnapshot.key;
	      items.push(item);
	    });
	    this.setState({
	      people: items
	    });
	  }.bind(this));
	}
	render() {
		const text = 'whats happening';
		var ref = firebase.database().ref("people")
		return (
			<div>{this.state.items}</div>
		);
	}
}

export default Main;