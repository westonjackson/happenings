import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DateInput from './DateInput.jsx';

class NewEventForm extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			location: '',

			year: '',
			month: '',
			day: '',
			hour: '',
			minute: '',

			datetime: '',
			description: '',
		}
	}
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	getMoment = () => {
		// '2013-02-08 09:30' is the ISO 8601 supported string format we use.
		const {year, month, day, hour, minute} = this.state;
		let dateStr = `${year}-${month}-${day} ${hour}:${minute}`;
		return moment(dateStr);
	}
	validateDate() {
		let momentObj = getMoment();
		return momentObj.isValid();
	}
	submitEventInfo() {
		return true;
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
						name="year"
						value={this.state.year}
						placeholder="YYYY"
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="month"
						value={this.state.month}
						placeholder="MM"
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="day"
						value={this.state.day}
						placeholder="DD"
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="hour"
						value={this.state.hour}
						placeholder="HH"
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
