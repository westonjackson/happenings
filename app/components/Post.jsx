import React from 'react';
import PropTypes from 'prop-types';
import { getPaginatedFeed } from '../utils/';
import Comment from './Comment.jsx';

class Post extends React.Component {
	COMMENTS_PAGE_SIZE = 3;
	state = {
		comments: {},
		gotData: false
	};
	componentWillMount() {
		const postId = this.props.id;
		this.fetchComments(postId).then(data => {
			this.setState({
				comments: data.entries,
				gotData: true
			});
		});
	}
	fetchComments(postId) {
		return getPaginatedFeed(`/comments/${postId}`, this.COMMENTS_PAGE_SIZE, null, false);
	}
	render() {
		if (this.state.gotData) {
		}
		return <div>author: {this.props.author.full_name}, caption: {this.props.caption}</div>
	}
}

Post.propTypes = {
	id: PropTypes.string,
	author: PropTypes.object,
	full_storage_uri: PropTypes.string,
	full_url: PropTypes.string,
	caption: PropTypes.string,
	thumb_storage_uri: PropTypes.string,
	timestamp: PropTypes.number,
};

export default Post;