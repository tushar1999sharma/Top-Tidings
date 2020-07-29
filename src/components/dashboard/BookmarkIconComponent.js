import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import swal from 'sweetalert';
import { firebase, firestore } from '../../config/fbConfig';
import { addBookmarkAction, 
        removeBookmarkAction, 
        bookmarkErrorAction 
    } from '../../store/actions/bookmarkActions';

class BookmarkIconComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBookmark: false
        }
    }
    
    componentDidMount(){
        const news = this.props.news;
        //check if news is bookmarked by user or not
        if(this.props.currentUser.auth.isEmpty === false) {
            //find in bookmarks only if user is authenticated
            const userID = this.props.currentUser.auth.uid;
            let flag = 0;
            firestore
                .collection("users")
                .doc(`/${userID}`)
                .get()
                .then((res) => {
                    //get list of bookmarks of the user logged in
                    res.data().listOfBookmarks.forEach(element => {
                        //compare url of news we are checking with bookmarked news
                        if(element.url === news.url) {
                            //news found in bookmark
                            flag = 1;
                        }
                    });
                })
                .then(() => {
                    if(flag) {
                        this.setState({
                            isBookmark: true
                        })
                    }
                    else {
                        this.setState({
                            isBookmark: false
                        })
                    }
                })
        }
        else {
            //since user is not authenticated so news can't be bookmarked
            this.setState({
                isBookmark: false
            })
        }
    }

    handleBookmark = (news) => {
        //on clicking bookmark icon
        if(this.props.currentUser.auth.isEmpty === false) {
            //first find if news with url is already present in this
            //if it present then remove it else add it to bookmark
            const userID = this.props.currentUser.auth.uid;
            const userRef = firestore.collection("users").doc(`${userID}`);
            let flag = 0;
            firestore
                .collection("users")
                .doc(`/${userID}`)
                .get()
                .then((res) => {
                    res.data().listOfBookmarks.forEach(element => {
                        if(element.url === news.url) {
                            flag = 1;
                        }
                    });
                })
                .then(() => {
                    if(flag === 1) {
                        //since bookmarked so remove it from bookmark  
                        userRef.update({
                            listOfBookmarks: firebase.firestore.FieldValue.arrayRemove(news)
                        })
                        this.setState({
                            isBookmark: false
                        })
                        this.props.removeBookmark();
                    }
                    else {
                        //since not present then add into bookmark array
                        userRef.update({
                            listOfBookmarks: firebase.firestore.FieldValue.arrayUnion(news)
                        })
                        this.setState({
                            isBookmark: true
                        })
                        this.props.addBookmark();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.props.bookmarkError(err);
                });
        }
        else {
            //if user not logged in then redirect to sign in page
            this.props.history.push("/signin");
            swal({
                text: 'You first need to log in',
                title: 'Error',
                icon: 'error',
                closeOnClickOutside: true,
                timer: 1500
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.isBookmark ? (
                    <div className="bookmarked-icon" onClick = { () => this.handleBookmark(this.props.news) }>
                        <i className="fa fa-bookmark"></i>
                    </div>
                ) : (
                    <div className="bookmark-icon" onClick = { () => this.handleBookmark(this.props.news) }>
                        <i className="fa fa-bookmark"></i>
                    </div>
                )}
            </div>
        )
        
    }
}

//take data from redux store to components prop
const mapStateToProps = (state) => {
	return {
        currentUser: state.firebase,
        bookmarks: state.firestore.data.bookmarks
	};
};
//take data to store
const mapDispatchToProps = (dispatch) => {
    return {
        addBookmark: () => dispatch(addBookmarkAction()),
        removeBookmark: () => dispatch(removeBookmarkAction()),
        bookmarkError: (err) => dispatch(bookmarkErrorAction(err))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookmarkIconComponent));
