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

			errorMsg: ''
		}
		// the ISO 8601 supported string format we use.
		this.DATE_FORMAT_STRING = 'YYYY-MM-DD HH:mm';
	}
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	parseDate = () => {
		const {year, month, day, hour, minute} = this.state;
		let dateStr = `${year}-${month}-${day} ${hour}:${minute}`;
		return moment(dateStr, this.DATE_FORMAT_STRING);
	}
	getValidDate = () => {
		let eventDate = this.parseDate();
		const isValid = eventDate.isValid();
		const isFutureEvent = this.isFutureEvent(eventDate);
		let errorMsg;
		if (!isValid) {
			errorMsg = 'Invalid date format! Sorry we made it hard';
		} else if (!isFutureEvent) {
			errorMsg = 'Creation of past events not currently supported';
		}
		if (isValid && isFutureEvent) {
			return eventDate;
		} else {
			this.setState({errorMsg: errorMsg});
			return false;
		}
	}
	isFutureEvent(momentObj) {
		const today = moment();
		return momentObj > today;
	}
	submitEventInfo() {
		return true;
	}
	handleSubmit = (event) => {
		event.preventDefault();
		const dateObj = this.getValidDate();
		if (dateObj == false) {
			console.log(this.state.errorMsg);
		} else {
			// get UNIX timestamp for backend
			const timeStamp = dateObj.valueOf();
			const dateString = dateObj.format(this.DATE_FORMAT_STRING);
			const payload = {
				'title': this.state.title,
				'location': this.state.location,
				'description': this.state.description,
				'timestamp': timeStamp,
				'date_string': dateString
			}
			this.props.handleFormInput(payload)
		}
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
						className='form-input'
					/>
					<input
						type="text"
						name="location"
						value={this.state.location}
						placeholder="Location"
						onChange={this.handleChange}
						className='form-input'
					/>
					<section>
						<input
							type="text"
							name="year"
							value={this.state.year}
							placeholder="YYYY"
							onChange={this.handleChange}
							className='form-input short'
						/>
						<input
							type="text"
							name="month"
							value={this.state.month}
							placeholder="MM"
							onChange={this.handleChange}
							className='form-input short'
						/>
						<input
							type="text"
							name="day"
							value={this.state.day}
							placeholder="DD"
							onChange={this.handleChange}
							className='form-input short'
						/>
						<input
							type="text"
							name="hour"
							value={this.state.hour}
							placeholder="HH"
							onChange={this.handleChange}
							className='form-input short'
						/>
					</section>
					<input
						type="text"
						name="description"
						value={this.state.description}
						placeholder="Description"
						onChange={this.handleChange}
						className='form-input'
					/>
					<button
						type="submit"
					>Create</button>
				</form>
			</div>
		)
	}
}

NewEventForm.propTypes = {
	imgLoaded: PropTypes.bool,
	handleFormInput: PropTypes.func
}

export default NewEventForm;
