import firebase from 'firebase';
import base from '../utils/rebase';
import * as types from '../constants/actionTypes.js'

let db = base.initializedApp.database();

export function listenRequested(metaType, ref) {
  return {
    type: types.FIREBASE_LISTEN_REQUESTED,
    metaType,
    ref
  }
}
export function listenRejected(metaType, error) {
  return {
    type: types.FIREBASE_LISTEN_REJECTED,
    metaType,
    error
  }
}
export function listenFulfilled(metaType, items) {
  return {
    type: types.FIREBASE_LISTEN_FULFILLED,
    metaType,
    items
  }
}
export function listenChildAdded(metaType, id, value) {
  return {
    type: types.FIREBASE_LISTEN_CHILD_ADDED,
    metaType,
    id,
    value,
  }
}
export function listenChildChanged(metaType, id, value) {
  return {
    type: types.FIREBASE_LISTEN_CHILD_CHANGED,
    metaType,
    id,
    value,
  }
}
export function listenChildRemoved(metaType, id) {
  return {
    type: types.FIREBASE_LISTEN_CHILD_REMOVED,
    metaType,
    id,
  }
}

export function listenRemoved(metaType) {
  return {
    type: types.FIREBASE_LISTEN_REMOVED,
    metaType,
  }
}

export function removeListenerRef(state, metaType) {
  if (state && state.listeners &&  state.listeners[metaType] &&
    state.listeners[metaType].ref) {
    state.listeners[metaType].ref.off();
  }
  return Promise.resolve();
}

export function removeListener(metaType) {
  return (dispatch, getState) => {
    return removeListenerRef(getState(), metaType).then(() => {
      dispatch(listenRemoved(metaType))
    })
  }
}

export function listenToPath(path, metaType) {
  return (dispatch, getState) => {
    const ref = db.ref(path)
    dispatch(listenRequested(metaType, ref))

    ref.on('child_added', (snap) => {
      if (getState().listeners[metaType].inProgress) {
        return
      }
      const val = snap.val()
      dispatch(listenChildAdded(metaType, snap.key, val))
    })
    ref.on('child_changed', (snap) => {
      if (getState().listeners[metaType].inProgress) {
        return
      }
      const val = snap.val()
      dispatch(listenChildChanged(metaType, snap.key, val))
    })
    ref.on('child_removed', (snap) => {
      if (getState().listeners[metaType].inProgress) {
        return
      }
      dispatch(listenChildRemoved(metaType, snap.key))
    })
    return ref.once('value').then(snap => {
      //better to have an empty object then a null
      //value if data does not exist
      const val = snap.val()
      const value = val ? val : { }
      dispatch(listenFulfilled(metaType, value))
    })
    .catch(error => {
      dispatch(listenRejected(metaType, error))
    })
  }
}
