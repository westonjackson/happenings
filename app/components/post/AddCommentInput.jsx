import React from 'react';
import PropTypes from 'prop-types';

class AddCommentInput extends React.Component {
	constructor() {
		super();
		this.state = {
			commentText: '',
			textFieldOpen: false
		}
	}
	openInput = () => {
		this.setState({textFieldOpen: true});
	}
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	handleSubmit = (event) => {
		event.preventDefault();
		const commentText = this.state.commentText;
		this.props.addComment(commentText);
		this.setState({
			commentText: '',
			textFieldOpen: false
		});
	}
	render() {
		const addCommentBtn = (
			<div onClick={this.openInput}>add a comment</div>
		);
		const inputField = (
			<form onSubmit={this.handleSubmit}>
				<input
					type="text"
					name="commentText"
					value={this.state.commentText}
					onChange={this.handleChange}
				/>
				<input
					type="submit"
					value="Add"
				/>
			</form>
		);
		return (
			<div>
				{this.state.textFieldOpen ? inputField : addCommentBtn}
			</div>
		)
	}
}

AddCommentInput.propTypes = {
	addComment: PropTypes.func,
}

export default AddCommentInput;