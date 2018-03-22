import React from 'react';
import PropTypes from 'prop-types';

class Comment extends React.Component {
	buildAuthorUrl(authorObject) {
		// TODO
		return '/';
	}
	render() {
		const authorUrl = this.buildAuthorUrl(this.props.author);
		const authorName = this.props.author.full_name;
		return (
			<div className='comment'>
				<a href={authorUrl}>{authorName}</a> {this.props.text}
			</div>
		)
	}
}

Comment.propTypes = {
	author: PropTypes.object,
	text: PropTypes.string,
};
export default Comment;