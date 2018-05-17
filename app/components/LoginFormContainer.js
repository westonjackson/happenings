import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { login } from '../actions/session_actions';

const mapStateToProps = state => ({
  loggedIn: !!state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
