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
        // prevent native submitting behavior
        event.preventDefault(); 
        //programmatically redirect to result page
        this.props.history.push(`/search/${this.state.query}`); 
        //clear state
		this.setState({
			query: ""
		});
	};

	render() {
		return (
			<form
				className="form-inline mx-auto"
                onSubmit={this.handleSubmit}
			>
				<input
					type="search"
					placeholder="Search Latest News"
					className="form-control searchBar"
					onChange={this.handleChange}
					value={this.state.query}
				/>
                <button className="btn btn-default btn-search" type="submit"><span className="fas fa-search search-icon"></span></button>
			</form>
		);
	}
}

export default withRouter(searchBarComponent);
