import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Spinner from "../layout/Spinner";
import swal from 'sweetalert';
import { firestore } from '../../config/fbConfig';
import { handleBookmarkAction } from '../../store/actions/bookmarkActions';
import { handleShareAction } from '../../store/actions/shareAction';
import {} from '../../store/actions/shareAction';

class showNewsComponent extends Component {
    checkBookmark = (news) => {
        if(this.props.currentUser.auth.isEmpty === false) {
            //find in bookmarks of user if it find in the bookmark or not
            const userID = this.props.currentUser.auth.uid;
            let flag = 0;
            firestore
                .collection("users")
                .doc(`/${userID}`)
                /* .where("bookmark", "array-contains", news) */
                .get()
                .then((res) => {
                    res.data().bookmark.forEach(element => {
                        console.log(element.url, news.url);
                        if(element.url === news.url) {
                            flag = 1;
                            console.log("found same so bookmarked")
                        }
                    });
                })
            
            if(flag) {
                console.log("Yes found");
                return true;
            }
            else {
                console.log("Not found");
                return false;
            }
        }
        else {
            return false;
        }
    }

    handleBookmark = (news) => {
        if(this.props.currentUser.auth.isEmpty === false) {
            this.props.bookmarkAction(this.props.currentUser, news);
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
                                {this.checkBookmark(headline) ? (
                                    <div className="bookmarked-icon" onClick = { () => this.handleBookmark(headline) }>
                                        <i className="fa fa-bookmark"></i>
                                    </div>
                                ) : (
                                    <div className="bookmark-icon" onClick = { () => this.handleBookmark(headline) }>
                                        <i className="fa fa-bookmark"></i>
                                    </div>
                                )}
                                
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
    console.log(state);
	return {
		headlines: state.news.headlines,
        isLoading: state.spinner.isLoading,
        currentUser: state.firebase
	};
};
//take data from props to store
const mapDispatchToProps = (dispatch) => {
    return {
        bookmarkAction: (currentUser, news) => dispatch(handleBookmarkAction(currentUser, news)),
        shareAction: (link) => dispatch(handleShareAction(link)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(showNewsComponent));
