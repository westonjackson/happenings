import { getUserFeedPosts } from '../utils/feed';
import * as types from '../constants/actionTypes.js'

export const getUserPosts = (uid) => dispatch => (
    getUserFeedPosts(uid).then(data => {
      dispatch(receivePosts(data))
    })
);

export const receivePosts = (data) => ({
  type: types.RECEIVE_POSTS,
  posts: data.entries
});
