import React, { Component } from "react";
import { connect } from "react-redux";
import { startSpinnerAction } from '../../store/actions/spinnerAction';
import { categoryAction } from "../../store/actions/getNewsActions";
import ShowNews from "./ShowNewsComponent";

class categeoryNewsComponent extends Component {
	//when component rendered this method will be first evoked
	componentDidMount() {
        //start spinner action so that in backside we can fetch data from api
		this.props.isLoadingNews();
        const ctgName = this.props.match.params.ctg_name;
        //action to fetch news and change news in state to new data 
		this.props.getCategoryNews(ctgName);
	}

	//if component is already mounted and only route parameter change
	componentDidUpdate(prevProps) {
        //start spinner action so that in backside we can fetch data from api
		this.props.isLoadingNews();
		if (this.props.match.params.ctg_name !== prevProps.match.params.ctg_name) {
            //dispatch action only if there is change in parameter
            const ctgName = this.props.match.params.ctg_name;
            //fetch data from api
			this.props.getCategoryNews(ctgName);
		}
	}

	render() {
		return (
			<div className="container categ center mt-3">
				<h5 className="text-center">
					Headlines from {this.props.match.params.ctg_name}
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
		getCategoryNews: (ctg) => dispatch(categoryAction(ctg))
	};
};

export default connect(null, mapDispatchToProps)(categeoryNewsComponent);
