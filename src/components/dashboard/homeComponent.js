import React, { Component } from "react";
import { connect } from "react-redux";
import ShowNews from "./ShowNewsComponent";
import { isLoadingAction } from '../../store/actions/spinnerAction';
import { homeAction } from "../../store/actions/getNewsActions";

class homeComponent extends Component {
	//we can initialize state by using constructor
	constructor(props) {
		super(props); //super initialize 'this' keyword
		//pass props to super to use props in constructor

		this.state = {
			headlines: []
		};
	}
	// didMount first execute when component created
	componentDidMount() {
		this.props.isLoadingNews();
		this.props.getHomeNews();
	}

	render() {
		return (
			<div className="container home center mt-4">
				<br />
				<h5 className="text-center">Todays Headlines</h5>
				<div className="row">
					<ShowNews />
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		isLoadingNews: () => dispatch(isLoadingAction()),
		getHomeNews: () => dispatch(homeAction())
	};
};

export default connect(null, mapDispatchToProps)(homeComponent);