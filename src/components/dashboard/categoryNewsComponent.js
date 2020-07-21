import React, { Component } from "react";
import { connect } from "react-redux";
import { startSpinnerAction } from '../../store/actions/spinnerAction';
import { categoryAction } from "../../store/actions/getNewsActions";
import ShowNews from "./ShowNewsComponent";

class categeoryNewsComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			headlines: []
		};
	}

	//when component rendered this method will be first evoked
	componentDidMount() {
		this.props.isLoadingNews();
		const ctgName = this.props.match.params.ctg_name;
		this.props.getCategoryNews(ctgName);
	}

	//if component is already mounted and only route parameter change
	componentWillReceiveProps(nextProps) {
		this.props.isLoadingNews();
		if (
			this.props.match.params.ctg_name !== nextProps.match.params.ctg_name
		) {
			const ctgName = nextProps.match.params.ctg_name;
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
					<ShowNews headlines={this.state.headlines} />
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		isLoadingNews: () => dispatch(startSpinnerAction()),
		getCategoryNews: (ctg) => dispatch(categoryAction(ctg))
	};
};

export default connect(null, mapDispatchToProps)(categeoryNewsComponent);
