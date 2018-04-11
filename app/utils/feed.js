import firebase from 'firebase';
import base from './rebase';
import { getPaginatedFeed } from './index';

let db = base.initializedApp.database();

const USER_FEED_POSTS_PAGE_SIZE = 6;

export function getPosts(uri, pageSize) {
	return getPaginatedFeed(uri, pageSize, null, true);
}

export function getUserFeedPosts(uid) {
	return getPosts(`/people/${uid}/posts`,
		USER_FEED_POSTS_PAGE_SIZE);
}
