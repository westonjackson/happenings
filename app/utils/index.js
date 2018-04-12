import firebase from 'firebase';
import base from './rebase';
import 'whatwg-fetch';
import { getPostData } from './post';

const db = base.initializedApp.database();

export function deleteFromFeed(uri, key) {
	return uri;
}

export function getPaginatedFeed(uri, pageSize, earliestEntryId = null, fetchPostDetails = false) {
	let ref = base.initializedApp.database().ref(uri);
	if (earliestEntryId) {
		ref = ref.orderByKey().endAt(earliestEntryId);
	}
	// we're fetching an additional item as a cheap way to test if there's a next page.
	return ref.limitToLast(pageSize + 1).once('value').then(data => {
		const entries = data.val() || {};

		//figure out if theres a next page
		let nextPage = null;
		const entryIds = Object.keys(entries);
		if (entryIds.length > pageSize) {
			delete entries[entryIds[0]];
			const nextPageStartingId = entryIds.shift();

			nextPage = () => getPaginatedFeed(
				uri, pageSize, nextPageStartingId, fetchPostDetails
			);
		}
		if (fetchPostDetails) {
			// fetch details of all posts. TODO: maybe do away with this entirely??
			const queries = entryIds.map(postId => getPostData(postId));
			// since all the requests are being done on the same feed, its unlikely that a single
			// one would fail and not the others so using Promise.all() is not so risky.
			return Promise.all(queries).then(results => {
				const deleteOps = [];
				results.forEach(result => {
					if (result.val()) {
						entries[result.key] = result.val();
					} else {
						// we encountered a delted post. remove it permanently from teh feed.
						delete entries[result.key];
						deleteOps.push(deleteFromFeed(uri, result.key));
					}
				});
				if (deleteOps.length > 0) {
					// we had to remove some deleted posts from the feed.
					// lets run the query again to get the correct # of posts.
					return getPaginatedFeed(uri, pageSize, earliestEntryId, fetchPostDetails);
				}
				return {entries: entries, nextPage: nextPage}
			});
		}
		return {entries: entries, nextPage: nextPage}
	});
}

// helper to flatten a dict of dicts to an array of dicts
export function toArray(dict) {
	return Object.keys(dict).map(key => {
		return { ...dict[key], key: key }
	});
};