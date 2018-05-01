import React from 'react';
import PropTypes from 'prop-types';

class NewEventForm extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			location: '',
			// todo: parse this datetime string into a TIMESTAMP
			datetime: '',
			description: '',
		}
	}
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="title"
						value={this.state.title}
						placeholder="Title"
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="location"
						value={this.state.location}
						placeholder="Location"
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="datetime"
						value={this.state.datetime}
						placeholder="Date and Time"
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="description"
						value={this.state.description}
						placeholder="Description"
						onChange={this.handleChange}
					/>
					<input
						type="submit"
						value="Create"
					/>
				</form>
			</div>
		)
	}
}

NewEventForm.propTypes = {
	onSubmit: PropTypes.func
}

export default NewEventForm;
