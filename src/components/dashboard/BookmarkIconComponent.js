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
        console.log(news);
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
                        //console.log(element.url, news.url);
                        if(element.url === news.url) {
                            flag = 1;
                            console.log("found same so bookmarked")
                        }
                    });
                })
                .then(() => {
                    if(flag) {
                        //console.log("Yes found");
                        this.setState({
                            isBookmark: true
                        })
                    }
                    else {
                        //console.log("Not found");
                        this.setState({
                            isBookmark: false
                        })
                    }
                })
        }
        else {
            this.setState({
                isBookmark: false
            })
        }
        console.log(this.state.isBookmark);
    }

    handleBookmark = (news) => {
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
                    console.log(res.data());
                    res.data().bookmark.forEach(element => {
                        if(element.url === news.url) {
                            flag = 1;
                        }
                    });
                })
                .then(() => {
                    if(flag === 1) {
                        console.log("delete bookmark");
                        userRef.update({
                            bookmark: firebase.firestore.FieldValue.arrayRemove(news)
                        })
                        this.setState({
                            isBookmark: false
                        })
                        this.props.removeBookmark();
                    }
                    else {
                        //since not present then add into bookmark array
                        console.log("add bookmark");
                        userRef.update({
                            bookmark: firebase.firestore.FieldValue.arrayUnion(news)
                        })
                        this.setState({
                            isBookmark: true
                        })
                        this.props.addBookmark();
                    }
                })
                .catch((err) => {
                    this.props.bookmarkError(err);
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
                timer: 1500
            })
        }
    }

    render() {
        console.log("re render with ", this.state.isBookmark);
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
        currentUser: state.firebase
	};
};
//take data from props to store
const mapDispatchToProps = (dispatch) => {
    return {
        addBookmark: () => dispatch(addBookmarkAction()),
        removeBookmark: () => dispatch(removeBookmarkAction()),
        bookmarkError: (err) => dispatch(bookmarkErrorAction(err))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookmarkIconComponent));
