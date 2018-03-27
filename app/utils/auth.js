import firebase from 'firebase';
import base from '../rebase';

// create a form that allows users to register with the app
// using their email address and password.
// first validate them, adn then pass them to this method.
export function signUpNewUser(email, password) {
	const auth = base.initializedApp.auth();
	auth.createUserWithEmailAndPassword(email, password).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
	})
}

export function signInWithEmailAndPassword(email, password) {
	const auth = base.initializedApp.auth();
	auth.signInWithEmailAndPassword(email, password).catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/wrong-password') {
			alert('wrong password');
		} else {
			alert(errorMessage);
		}
	})
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
