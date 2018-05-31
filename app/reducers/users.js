import * as types from '../constants/actionTypes.js';

const usersReducer = (state = {}, action) => {
  switch(action.type){
    case types.RECEIVE_USER:
      // TODO need to shape response from firebase to avoid this mess
      // would be easier if the url to a user were there id
      const uid = Object.keys(action.user)[0];
      // good god
      const shapedUser = action.user[uid];
      if (shapedUser.posts) {
        shapedUser.posts = Object.keys(shapedUser.posts);
      }
      shapedUser.uid = uid;

      return Object.assign({}, state, { [action.user[uid].username]: shapedUser });
    default:
      return state;
  }
};

export default usersReducer;
