import firebase from 'firebase';
import base from './rebase';

import { getAuth } from './auth';

export function uploadEvent(eventObj, pic, thumb, filename, callback) {
	// first need to upload event pic to cloud storage
	// then, create a new Event in the DB referencing it
	// return a promise which completes with the new PostId.

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
		// TODO -- figure better pattern for error handling using Promises.
		callback(error)
	});

	// start the thumb file upload to Cloud storage
	const thumbRef = storage.ref(`${auth.currentUser.uid}/thumb/${newPostKey}/${fileName}`);
	const thumbUploadTask = thumbRef.put(pic, metadata).then(snapshot => {
		var url = snapshot.metadata.downloadURLs[0];
		return url;
	}).catch(error => {
		callback(error);
	});

	const usernameTask = getUsername(auth.currentUser.uid).then(snapshot => {
		const username = snapshot.val();
		return username;
	});

	var promises = [imgUploadTask, thumbUploadTask, usernameTask];

	return Promise.all(promises).then(data => {
		// once both image and thumb have been uploaded to storage, add a new record in DB
		// and fan it out to post lists (user's post list etc)
		const updates = {};
		updates[`/posts/${newPostKey}`] = {
			full_url: data[0],
			thumb_url: data[1],
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			full_storage_uri: imgRef.toString(),
			thumb_storage_uri: thumbRef.toString(),
			// TODO USERNAME
			author: {
				uid: auth.currentUser.uid,
				full_name: auth.currentUser.displayName,
				profile_picture: auth.currentUser.photoURL,
				username: data[2];
			}
		};
		updates[`/people/${auth.currentUser.uid}/posts/${newPostKey}`] = true;
		updates[`/feed/${auth.currentUser.uid}/${newPostKey}`] = true;

		return database.ref().update(updates).then(() => newPostKey);
	});




}