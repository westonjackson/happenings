import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';

const mapStateToProps = state => ({
  loggedIn: !!state.session.currentUser,
  currentUser: state.session.currentUser
})

export default withRouter(connect(
  mapStateToProps,
  null
)(ProfilePage));
