import firebase from 'firebase';
import base from './rebase';
import latinize from 'latinize';

let db = base.initializedApp.database();

export function loadUserData(username) {
	// let db = base.initializedApp.database();
	return db.ref('/people/').orderByChild('username').equalTo(username).once('value');
}

// gets the number of followers a user has
export function registerForFollowersCount(uid, callback) {
	const ref = db.ref(`/followers/${uid}`);
	ref.on('value', data => callback(data.numChildren()));
}

// gets the number of people a user is following
export function registerForFollowingCount(uid, callback) {
	const ref = db.ref(`/people/${uid}/following`);
	ref.on('value', data => callback(data.numChildren()));
}

/**
 * Saves public user data to the database after signup
 */
export function saveUserData(uid, userName, displayName, imageUrl) {
	let searchFullName = displayName.toLowerCase();
	let searchReversedFullName = searchFullName.split(' ').reverse().join(' ');
	try {
		searchFullName = latinize(searchFullName);
		searchReversedFullName = latinize(searchReversedFullName);
	} catch(e) {
		console.error(e);
	}
	const userInfo = {
		profile_picture: imageUrl,
		username: userName,
		full_name: displayName,
		_search_index: {
			full_name: searchFullName,
			reversed_full_name: searchReversedFullName
		}
	};
	return base.initializedApp.database().ref(`people/${uid}`).update(userInfo);
}