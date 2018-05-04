import firebase from 'firebase';
import base from './rebase';
import { getPaginatedFeed, subscribeToFeed, getUsername } from './index';
import { getAuth } from './auth';
import { PAGE_SIZES } from '../constants';

/**
 * Functions for handling all things related to an individual post
 */

const COMMENTS_PAGE_SIZE = 3;

// firebase crap
let db = base.initializedApp.database();
let auth = getAuth();

//TODO: subscribe to new comments
 export function fetchComments(postId) {
 	return getPaginatedFeed(`/comments/${postId}`, PAGE_SIZES.COMMENTS, null, false);
 }

 /**
  * determine if the current user has liked a given post
  */
export function registerUserToLike(postId, callback) {
	const ref = db.ref(`/likes/${postId}/${auth.currentUser.uid}`);
	ref.on('value', data => callback(!!data.val()));
}

/**
 * gets post data such as image and caption
 */
export function getPostData(postId) {
	return db.ref(`/posts/${postId}`).once('value');
}

/**
 * Listens to updates on the likes of a post and calls the callback with likes counts.
 * TODO: This won't scale if a user has a huge amount of likes. We need to keep track of a
 *       likes count instead.
 */
export function registerForLikesCount(postId, callback) {
	const ref = db.ref(`/likes/${postId}`);
	ref.on('value', data => callback(data.numChildren()));
}

/**
 * probably won't scale either..
 */
export function registerForCommentsCount(postId, callback) {
	const ref = db.ref(`/comments/${postId}`);
	ref.on('value', data => callback(data.numChildren()));
}

/**
 * Updates the like status of a post from the current user.
 */
export function updateLike(postId, value) {
	return db.ref(`/likes/${postId}/${auth.currentUser.uid}`).set(
		value ? firebase.database.ServerValue.TIMESTAMP : null
	);
}

export function addComment(currentUser, postId, text) {
	// TODO: this is sort of unacceptable in terms of performance
	// should not need to ask the server for the username before we make a comment
	// is there a way to store username globally without using Redux?
	getUsername(currentUser.uid).then(snapshot => {
		const username = snapshot.val();
		const comment = {
			text: text,
			timestamp: Date.now(),
			author: {
				uid: currentUser.uid,
				full_name: currentUser.displayName,
				profile_picture: currentUser.photoURL,
				username: username
			}
		};
		return db.ref(`/comments/${postId}`).push(comment);
	});
}

export function subscribeToComments(postId, latestCommentId, callback) {
	return subscribeToFeed(`/comments/${postId}`, callback, latestCommentId, false);
}
