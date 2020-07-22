import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import swal from 'sweetalert';
import { handleBookmarkAction } from '../../store/actions/bookmarkActions';
import { handleShareAction } from '../../store/actions/shareAction';

class bookmarks extends Component {
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
                timer: 1000
            })
        }
    }

    handleShare = (link) => {
        this.props.shareAction(link);
    }

    render() {
        return ( 
            <div className="container Bmark center mt-3">
                <h5 className="text-center">
                    Your Bookmarks
                </h5>
                <div className="row mt-1">
                    {(this.props.currentUser.isLoaded === false) ? (
                        <Spinner />
                    ) : this.props.currentUser.profile.bookmark.length ? (
                        this.props.currentUser.profile.bookmark.map((headline, index) => {
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
                                            <div className="bookmarked-icon" onClick = { () => this.handleBookmark(headline) }>
                                                <i className="fa fa-bookmark"></i>
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
                            )
                        })
                    ) : (
                        <div className="center">
                            <h4 className="text-danger">OOPS! You have no bookmark</h4>
                        </div>
                    )};
                </div>
            </div>
        )
    }
}

//take data from redux store to components prop
const mapStateToProps = (state) => {
    console.log(state);
	return {
        currentUser: state.firebase
	};
};
const mapDispatchToProps = (dispatch) => {
    return {
        bookmarkAction: (currentUser, news) => dispatch(handleBookmarkAction(currentUser, news)),
        shareAction: (link) => dispatch(handleShareAction(link)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(bookmarks));