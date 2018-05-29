import { combineReducers } from 'redux';

import session from './session';
import errors from './errors';
import ui from './ui';
import entities from './entities';

const rootReducer = combineReducers({
  session,
  errors,
  ui,
  entities
});

export default rootReducer;
