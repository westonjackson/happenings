import { signInWithEmailAndPassword, getAuth } from '../utils/auth';
import { getUsername } from '../utils/index';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

export const login = (email, password) => dispatch => (
  signInWithEmailAndPassword(email, password).then(
    ({uid, email}) => {
      getUsername(uid).then((snapshot) => {
        const username = snapshot.val();
        const loggedInUser = { username, uid , email }
        dispatch(receiveCurrentUser(loggedInUser))
      });
    },
    errors => dispatch(receiveSessionErrors(errors))
  )
);

// need to configure babel to use es7 if we want sexi asnyc/await
// export const login = (email, password) => async dispatch => {
//   const {uid, email} = await signInWithEmailAndPassword(email, password)
//   const username = await getUsername(uid);
//   const loggedInUser = { username, uid , email }
//   dispatch(receiveCurrentUser(loggedInUser));
// };

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

// will be used for logout
export const clearCurrentUser = () => ({
  type: CLEAR_CURRENT_USER
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});
