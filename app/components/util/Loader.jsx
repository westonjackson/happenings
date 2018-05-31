import React, { Component } from "react";
import PropTypes from "prop-types";

class Loader extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    asnycCall: PropTypes.string.isRequired,
  };

  state = {
    payload: {},
    isLoading: true,
  };

  executeAsyncCall() {
    this.props.asycCall().then(payload => {
      this.setState({
        isLoading: false,
        payload
      });
    });
  }

  componentDidMount() {
    this.executeAsyncCall();
  }

  render() {
    return this.props.render(this.state);
  }
}
