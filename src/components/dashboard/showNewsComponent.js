import React, { Component } from 'react';
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

class showNewsComponent extends Component {
    checkBookmark = () => {
        if(this.props.auth.isAuthenticated) {
            //find in bookmarks of user if it find in the bookmark or not
        }
        else {
            return false;
        }
    }

    handleBookmarkClick = () => {
        if(this.props.firebase.isEmpty) {

        }
        else {
            this.props.history.push('/signin');
        }
    }
    
    render() {
        return ( this.props.isLoading/*  || !this.props.isFirebaseLoaded */) ? (
            <Spinner />
        ) : this.props.headlines.length ? (
            this.props.headlines.map((headline, index) => {
                return (
                    <div
                        className="col-xl-4 col-md-6 col-sm-12 d-flex align-items-stretch"
                        key={index}
                    >
                        <div className="card booking-card">
                            <div className="view overlay card-container">
                                {/* SHARE ICON */}
                                <div className="share-icon">
                                    <i className="fas fa-share-alt"></i>
                                </div>
                                {/* BOOKMARK ICON */}
                                <div className="bookmark-icon" onClick = {this.handleBookmark}>
                                    <i className="far fa-bookmark"></i>
                                </div>
                                <img
                                    id="indexcardimage"
                                    className="card-img-top"
                                    src={headline.urlToImage}
                                    alt="img"
                                />
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h4 className="card-title font-weight-bold text-dark">
                                    {/* 
                                                target: _blank to open link new tab  
                                                rel="noopener noreferrer" to prevent newly opened tab 
                                                from being able to modify the original tab maliciously 
                                            */}
                                    <a
                                        href={headline.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-dark"
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
                                    className="btn btn-dark mt-auto"
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
    console.log(state);
	return {
		headlines: state.news.headlines,
        isLoading: state.spinner.isLoading,
        isFirebaseLoaded: state.firebase.auth.isLoaded
	};
};

export default connect(mapStateToProps, null)(showNewsComponent);
