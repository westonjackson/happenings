import firebase from 'firebase';
import base from './rebase';
import { getPaginatedFeed } from './index';
import { getAuth } from './auth';

/**
 * Functions for handling all things related to an individual post
 */

const COMMENTS_PAGE_SIZE = 3;

// firebase stuff
let db = base.initializedApp.database();
let auth = getAuth();

//TODO: subscribe to new comments
 export function fetchComments(postId) {
 	return getPaginatedFeed(`/comments/${postId}`, COMMENTS_PAGE_SIZE, null, false);
 }

 // determined whether or not the current user has liked a post
export function registerUserToLike(postId, callback) {
	// load and listen to new likes
	const ref = db.ref(`/likes/${postId}/${auth.currentUser.uid}`);
	ref.on('value', data => callback(!!data.val()));
}

export function getPostData(postId) {
	return db.ref(`/posts/${postId}`).once('value');
}
