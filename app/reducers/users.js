import * as types from '../constants/actionTypes.js';

const usersReducer = (state = {}, action) => {
  switch(action.type){
    case types.RECEIVE_USER:
      // would be easier if the url to a user were there id
      const uid = Object.keys(action.user)[0];
      // good god
      const user = { [action.user[uid].username]: { ...action.user[uid], uid } }
      return Object.assign({}, state, user);
    default:
      return state;
  }
};

export default usersReducer;
