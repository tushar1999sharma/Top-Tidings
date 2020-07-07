import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class searchBarComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: ""
		};
	}

	handleChange = (event) => {
		this.setState({
			query: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault(); // prevent native submitting behavior
		this.props.history.push(`/search/${this.state.query}`); //programmatically redirect to result page
		this.setState({
			query: ""
		});
	};

	render() {
		return (
			<form
				className="form-inline my-2 my-lg-0 mr-auto ml-auto search-form"
				onSubmit={this.handleSubmit}
			>
				<input
					type="search"
					placeholder="Search Latest News"
					className="form-control pl-3 searchBar"
					onChange={this.handleChange}
					value={this.state.query}
				/>
				<div class="input-group-btn">
                    <button class="btn btn-default" type="submit"><span class="fas fa-search search-icon"></span></button>
                </div>
			</form>
		);
	}
}

export default withRouter(searchBarComponent);
