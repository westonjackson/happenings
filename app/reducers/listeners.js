// TODO normalize state? currently storing children nestedd under
// listeners slice of state as 'items'
import * as types from '../constants/actionTypes.js';

export const metaTypes = {
  people: 'people',
  posts: 'posts',
  followers: 'followers'
}

function getInitialState() {
  let initialState = { }
  Object.keys(metaTypes).forEach((metaType) => {
    initialState[metaType] = { inProgress: false, items: { } }
  })

  return initialState
}

const initialState = getInitialState()

const listenersReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.FIREBASE_LISTEN_REQUESTED:
      return {
        ...state,
        [action.metaType]: {
          ...state[action.metaType],
          inProgress: true, error: '', ref: action.ref
        }
      };
    case types.FIREBASE_LISTEN_FULFILLED:
      return {
        ...state,
        [action.metaType]: {
          ...state[action.metaType],
          inProgress: false, error: '', items: action.items
        }
      };
    case types.FIREBASE_LISTEN_REJECTED:
      const error = action.error
      return {
        ...state,
        [action.metaType]: {
          ...state[action.metaType], inProgress: false, error
        }
      };
    case types.FIREBASE_LISTEN_REMOVED:
      return {
        ...state,
        [action.metaType]: {
          ...state[action.metaType],
          inProgress: false, error: '', ref: null
        }
      };
    case types.FIREBASE_LISTEN_CHILD_ADDED:
    case types.FIREBASE_LISTEN_CHILD_CHANGED:
      let currentItems = state[action.metaType].items;
      let items = { ...currentItems, [action.id]: action.value };
      return {
        ...state,
        [action.metaType]: {
          ...state[action.metaType], inProgress: false, error: '', items
        }
      };
    case types.FIREBASE_LISTEN_CHILD_REMOVED:
      currentItems = state[action.metaType].items;
      items = { ...currentItems };
      delete items[action.id]
      return {
        ...state,
        [action.metaType]: {
          ...state[action.metaType], inProgress: false, error: '', items
        }
      };
    default:
      return state;
  }
};

export default listenersReducer;
