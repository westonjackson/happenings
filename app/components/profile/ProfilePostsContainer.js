import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfilePosts from './ProfilePosts';
import { selectAuthoredPosts } from '../../reducers/selectors';
import { getUserPosts } from '../../actions/post_actions';

const mapStateToProps = (state, ownProps) => ({
  posts: selectAuthoredPosts(state, ownProps.match.params.username)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPosts: (uid) => dispatch(getUserPosts(ownProps.uid))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePosts));
