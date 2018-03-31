import firebase from 'firebase';
import base from '../utils/rebase';
import 'whatwg-fetch';

// create a form that allows users to register with the app
// using their email address and password.
// first validate them, adn then pass them to this method.
export function signUpNewUser(email, password) {
	const auth = base.initializedApp.auth();
	auth.createUserWithEmailAndPassword(email, password).then((response) => {
		console.log(response);
	}).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		alert(errorMessage);
	})
}

export function signInWithEmailAndPassword(email, password) {
	const auth = base.initializedApp.auth();
	auth.signInWithEmailAndPassword(email, password).then((response) => {
		console.log('signed in!');
		console.log(response);
	}).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/wrong-password') {
			alert('wrong password');
		} else {
			alert(errorMessage);
		}
	})
}

export function signUserOut() {
	base.initializedApp.auth().signOut().then(() => {
		console.log('bye');
	}).catch((error) => {
		alert(error.message);
	});
}

// helper function to keep less code in components
export function getAuth() {
	return base.initializedApp.auth();
}

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     var displayName = user.displayName;
//     var email = user.email;
//     var emailVerified = user.emailVerified;
//     var photoURL = user.photoURL;
//     var isAnonymous = user.isAnonymous;
//     var uid = user.uid;
//     var providerData = user.providerData;
//     // ...
//   } else {
//     // User is signed out.
//     // ...
//   }
// });
