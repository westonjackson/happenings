import { combineReducers } from 'redux';

import users from './users';
import posts from './posts';

const entitiesReducer = combineReducers({
  users,
  posts
});

export default entitiesReducer;
