import React, { Component } from "react";
import { connect } from "react-redux";
import ShowNews from "./ShowNewsComponent";
import { startSpinnerAction } from '../../store/actions/spinnerAction';
import { queryAction } from "../../store/actions/getNewsActions";

class searchNewsComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			headlines: []
		};
	}

	//when component rendered this method will be first evoked
	componentDidMount() {
		this.props.isLoadingNews();
		const query = this.props.match.params.query;
		this.props.getQueryNews(query);
	}

	//if component is already mounted and only route parameter change
	componentDidUpdate(prevProps) {
		if (this.props.match.params.query !== prevProps.match.params.query) {
			this.props.isLoadingNews();
			const query = prevProps.match.params.query;
			this.props.getQueryNews(query);
		}
	}

	render() {
		return (
			<div className="container search mt-3">
				<h5 className="text-center">
					Headlines from {this.props.match.params.query}
				</h5>
				<div className="row mt-1">
					<ShowNews headlines={this.state.headlines} />
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		isLoadingNews: () => dispatch(startSpinnerAction()),
		getQueryNews: (query) => dispatch(queryAction(query))
	};
};

export default connect(null, mapDispatchToProps)(searchNewsComponent);
