import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Comment extends React.Component {
	render() {
		const authorUrl = `/user/${this.props.author.uid}`
		const authorName = this.props.author.full_name;
		return (
			<div className='comment'>
				<Link to={authorUrl}>{authorName}</Link> {this.props.text}
			</div>
		)
	}
}

Comment.propTypes = {
	author: PropTypes.object,
	text: PropTypes.string,
};
export default Comment;