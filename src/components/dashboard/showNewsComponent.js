import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Spinner from "../layout/Spinner";
import BookmarkIcon from './BookmarkIconComponent';
import { handleShareAction } from '../../store/actions/shareAction';

class showNewsComponent extends Component {
    handleShare = (link) => {
        this.props.shareAction(link);
    }
    
    render() {
        return ( this.props.isLoading) ? (
            <Spinner />
        ) : this.props.headlines.length ? (
            this.props.headlines.map((headline, index) => {
                return (
                    <div
                        className="col-xl-4 col-md-6 col-sm-12 d-flex align-items-stretch"
                        key={index}
                    >
                        <div className="card booking-card news-card">
                            <div className="view overlay card-container">

                                {/* SHARE ICON */}
                                <div className="share-icon" onClick={ () => this.handleShare(headline.url) }>
                                    <i className="fas fa-share-alt"></i>
                                </div>

                                {/* BOOKMARK ICON */}
                                <BookmarkIcon news = {headline}/>
                                
                                <img
                                    id="indexcardimage"
                                    className="card-img-top"
                                    src={headline.urlToImage}
                                    alt="img"
                                />
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h4 className="card-title font-weight-bold">
                                    {/* 
                                        target: _blank to open link new tab  
                                        rel="noopener noreferrer" to prevent newly opened tab 
                                        from being able to modify the original tab maliciously 
                                    */}
                                    <a
                                        href={headline.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="card-link"
                                    >
                                        {headline.title}
                                    </a>
                                </h4>
                                <p className="card-text">
                                    {headline.description}...
                                </p>
                                <a
                                    href={headline.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn mt-auto card-btn"
                                >
                                    More info
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })
        ) : (
            <div className="center">
                <h4 className="text-danger">OOPS! No result found</h4>
            </div>
        );
    }
}

//take data from redux store to components prop
const mapStateToProps = (state) => {
    //console.log(state);
	return {
		headlines: state.news.headlines,
        isLoading: state.spinner.isLoading,
	};
};
//take data from props to store
const mapDispatchToProps = (dispatch) => {
    return {
        shareAction: (link) => dispatch(handleShareAction(link)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(showNewsComponent));
