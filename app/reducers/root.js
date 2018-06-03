import { combineReducers } from 'redux';

import session from './session';
import errors from './errors';
import ui from './ui';
import entities from './entities';
import listeners from './listeners';

const rootReducer = combineReducers({
  session,
  errors,
  ui,
  entities,
  listeners
});

export default rootReducer;
