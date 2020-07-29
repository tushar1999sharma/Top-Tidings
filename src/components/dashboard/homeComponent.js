import React, { Component } from "react";
import { connect } from "react-redux";
import ShowNews from "./ShowNewsComponent";
import { startSpinnerAction } from '../../store/actions/spinnerAction';
import { homeAction } from "../../store/actions/getNewsActions";

class homeComponent extends Component {
	// didMount first execute when component created
	componentDidMount() {
        //start spinner to load data from api
        this.props.isLoadingNews();
        //get data from api meanwhile
		this.props.getHomeNews();
	}

	render() {
		return (
			<div className="container home center mt-3">
				<h5 className="text-center">Todays Headlines</h5>
				<div className="row mt-1">
					<ShowNews />
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		isLoadingNews: () => dispatch(startSpinnerAction()),
		getHomeNews: () => dispatch(homeAction())
	};
};

export default connect(null, mapDispatchToProps)(homeComponent);
