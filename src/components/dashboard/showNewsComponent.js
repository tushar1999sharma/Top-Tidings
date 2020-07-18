import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { firestore } from '../../config/fbConfig';
import Spinner from "../layout/Spinner";
import swal from 'sweetalert';

class showNewsComponent extends Component {
    checkBookmark = () => {
        if(this.props.auth.isAuthenticated) {
            //find in bookmarks of user if it find in the bookmark or not
        }
        else {
            return false;
        }
    }

    handleBookmark = (news) => {
        console.log(this.props.currentUser.auth.uid);
        if(this.props.currentUser.auth.isEmpty === false) {
            //first find if news with url is already present in this
            //if it present then remove ir else add it to bookmark
            firestore
                .collection("users")
                .doc(this.props.currentUser.auth.uid)
                .where("bookmark", "array-contains", news)
                .get()
                .then((res) => {
                    console.log(res);
                    console.log(res.data());
                    if(res.size() === 0) {
                        //since not present then add into bookmark array
                        console.log("add bookmark");
                    }
                    else {
                        console.log("delete bookmark");
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }
        else {
            this.props.history.push("/signin");
            swal({
                text: 'You first need to log in',
                title: 'Error',
                icon: 'error',
                closeOnClickOutside: true,
                timer: 700
            })
        }
    }

    handleShare = (link) => {
        console.log("copy link to clipboard");
        console.log(this.props.currentUser);
        navigator.clipboard.writeText(link); 
        swal({
            text: 'News link copied to clipboard',
            title: 'Success',
            icon: 'success',
            closeOnClickOutside: true,
            timer: 700
        })
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
                        <div className="card booking-card">
                            <div className="view overlay card-container">
                                {/* SHARE ICON */}
                                <div className="share-icon" onClick={ () => this.handleShare(headline.url) }>
                                    <i className="fas fa-share-alt"></i>
                                </div>
                                {/* BOOKMARK ICON */}
                                <div className="bookmark-icon" onClick = { () => this.handleBookmark(headline) }>
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
        currentUser: state.firebase
	};
};

export default connect(mapStateToProps, null)(withRouter(showNewsComponent));
