import React, { Component } from "react";
import { connect } from "react-redux";
import ShowNews from "./ShowNewsComponent";
import { startSpinnerAction } from '../../store/actions/spinnerAction';
import { queryAction } from "../../store/actions/getNewsActions";

class searchNewsComponent extends Component {
	//when component rendered this method will be first evoked
	componentDidMount() {
        //start spinner so we can load data from api in backside
		this.props.isLoadingNews();
        const query = this.props.match.params.query;
        //get data from api
		this.props.getQueryNews(query);
	}

	//if component is already mounted and only route parameter change
	componentDidUpdate(prevProps) {
        //re render only if there is change in parameter
		if (this.props.match.params.query !== prevProps.match.params.query) {
            //start spinner 
			this.props.isLoadingNews();
            const query = this.props.match.params.query;
            //get data from api
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
					<ShowNews />
				</div>
			</div>
		);
	}
}

//dispatch action to change data in store
const mapDispatchToProps = (dispatch) => {
	return {
		isLoadingNews: () => dispatch(startSpinnerAction()),
		getQueryNews: (query) => dispatch(queryAction(query))
	};
};

export default connect(null, mapDispatchToProps)(searchNewsComponent);
