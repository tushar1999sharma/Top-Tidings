import React, { Component } from "react";
import { connect } from "react-redux";
import ShowNews from "./ShowNewsComponent";
import { startSpinnerAction } from '../../store/actions/spinnerAction';
import { sourceAction } from "../../store/actions/getNewsActions";

class sourceNewsComponent extends Component {
	//when component rendered this method will be first evoked
	componentDidMount() {
        //start spinner so we can get data from api
		this.props.isLoadingNews();
        const srcID = this.props.match.params.src_id;
        //get data from api
		this.props.getSourceNews(srcID);
	}

	//if component is already mounted and only route parameter changes
	componentDidUpdate(prevProps) {
        //re render only if previous parameter is diffrent from current
		if (this.props.match.params.src_id !== prevProps.match.params.src_id) {
            //start spinner
			this.props.isLoadingNews();
            const srcID = this.props.match.params.src_id;
            //get data from api
			this.props.getSourceNews(srcID);
		}
	}

	render() {
		return (
			<div className="container sources center mt-3">
				<h5 className="text-center">
					Headlines from {this.props.match.params.src_id}
				</h5>
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
		getSourceNews: (srcID) => dispatch(sourceAction(srcID))
	};
};

export default connect(null, mapDispatchToProps)(sourceNewsComponent);
