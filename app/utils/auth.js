import firebase from 'firebase';
import base from '../utils/rebase';
import { saveUserData } from './user.js';

/**
 * Functions for handling all authentication flows
 */

export function signUpNewUser(userInfo) {
	const auth = base.initializedApp.auth();
	auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password).then((response) => {
		// this could also be set by Google sign in provider or something
		const fullName = (userInfo.fullName || response.displayName);
		const userName = userInfo.userName;
		console.log('created account');
		debugger;
		saveUserData(response.uid, userName, fullName, response.photoURL);
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
