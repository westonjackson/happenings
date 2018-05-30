import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';

import { listenToPath, removeListener } from '../../actions/listener_actions';
import { fetchUserByUsername } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => ({
  loggedIn: !!state.session.currentUser,
  currentUser: state.session.currentUser,
  followerCount: Object.keys(state.listeners.followers.items).length,
  followingCount: Object.keys(state.listeners.people.items).length,
  username: ownProps.match.params.username,
  user: state.entities.users[ownProps.match.params.username]
})

const mapDispatchToProps = dispatch => ({
  listenToFollowers: (uid) => dispatch(listenToPath(`/followers/${uid}`, 'followers')),
  listenToFollowing: (uid) => dispatch(listenToPath(`/people/${uid}/following`, 'people')),
  fetchUserByUsername: (username) => dispatch(fetchUserByUsername(username)),
  removeListener: (metaType) => dispatch(removeListener(metaType))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage));
