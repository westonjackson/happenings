import React from 'react';
import PropTypes from 'prop-types';

class DateInput extends React.Component {
	// TODO: finish this component and incorporate it to NewEventForm.
	// holding off for now to avoid premature optimization.

	// ALSO this http://react-day-picker.js.org/

	
	constructor() {
		super();
		this.state = {
			year: '',
			month: '',
			day: '',
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
			</div>
		)
	}
}

export default DateInput;