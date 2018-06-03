import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from './App';
import { fetchCurrentUser } from '../actions/session_actions';

const mapStateToProps = state => ({
  loggedIn: !!state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
  fetchUser: (email, uid) => dispatch(fetchCurrentUser(email, uid))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
