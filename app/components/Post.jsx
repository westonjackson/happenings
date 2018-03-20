import React from 'react';
import PropTypes from 'prop-types';

// the constructor here should minic post.getPostData
class Post extends React.Component {
	render() {
		console.log(this.props.id);
		return <div>author: {this.props.author.full_name}, caption: {this.props.caption}</div>
	}
}

Post.propTypes = {
	author: PropTypes.object,
	full_storage_uri: PropTypes.string,
	full_url: PropTypes.string,
	caption: PropTypes.string,
	thumb_storage_uri: PropTypes.string,
	timestamp: PropTypes.number,
}

export default Post;