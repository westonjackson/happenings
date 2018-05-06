import firebase from 'firebase';
import base from './rebase';

import { getAuth } from './auth';
import { getUsername } from './index';

export function uploadEvent(eventObj, pic, fileName, callback) {

	// firebase stuff sorry
	let auth = getAuth();
	let storage = base.initializedApp.storage();
	let database = base.initializedApp.database();
	const metadata = {
		contentType: pic.type
	};

	const newPostKey = database.ref('/posts').push().key;

	// start the pic upload to cloud storage
	const imgRef = storage.ref(`${auth.currentUser.uid}/full/${newPostKey}/${fileName}`);
	let imgUploadTask = imgRef.put(pic, metadata).then(snapshot => {
		console.log('uploaded new pic of size ', snapshot.totalBytes, 'bytes.');
		let url = snapshot.metadata.downloadURLs[0];
		return url;
	}).catch(error => {
		callback(error)
	});

	// this is sad
	const usernameTask = getUsername(auth.currentUser.uid).then(snapshot => {
		const username = snapshot.val();
		return username;
	});

	var promises = [imgUploadTask, usernameTask];

	return Promise.all(promises).then(data => {
		// once both image and thumb have been uploaded to storage, add a new record in DB
		// and fan it out to post lists (user's post list etc)
		const updates = {};
		updates[`/posts/${newPostKey}`] = {
			full_url: data[0],
			// thumb_url: data[1],
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			full_storage_uri: imgRef.toString(),
			// thumb_storage_uri: thumbRef.toString(),
			author: {
				uid: auth.currentUser.uid,
				full_name: auth.currentUser.displayName,
				profile_picture: auth.currentUser.photoURL,
				username: data[1],
			},
			title: eventObj.title,
			location: eventObj.location,
			description: eventObj.description,
			event_timestamp: eventObj.timestamp,
			date_string: eventObj.date_string,
		};
		updates[`/people/${auth.currentUser.uid}/posts/${newPostKey}`] = true;
		updates[`/feed/${auth.currentUser.uid}/${newPostKey}`] = true;
		callback(updates);

		return database.ref().update(updates).then(() => {
			callback('DONE');
			newPostKey;
		});
	});
}