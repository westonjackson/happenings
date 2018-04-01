import firebase from 'firebase';
import base from './rebase';
import latinize from 'latinize';

export function loadUserProfile(uid) {
	let db = base.initializedApp.database();
	return base.initializedApp.database().ref(`/people/${uid}`).once('value');
}

export function saveUserData(uid, userName, displayName, imageUrl) {
	if (!displayName) {
		displayName = 'Anonymous';
	}
	let searchFullName = displayName.toLowerCase();
	let searchReversedFullName = searchFullName.split(' ').reverse().join(' ');
	try {
		searchFullName = latinize(searchFullName);
		searchReversedFullName = latinize(searchReversedFullName);
	} catch(e) {
		console.error(e);
	}
	const payload = {
		profile_picture: imageUrl,
		username: userName,
		full_name: displayName,
		_search_index: {
			full_name: searchFullName,
			reversed_full_name: searchReversedFullName
		}
	};
	return base.initializedApp.database().ref(`people/${uid}`).update(payload);
}