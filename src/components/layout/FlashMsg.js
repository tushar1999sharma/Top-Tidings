import React from 'react';
import { connect } from "react-redux";

const flashMsg = (props) => {
    return (
        // show messages if exist
        <div className="container sticky-top flash-msg my-auto">
            <div className="errorMsg">
                { props.bookmarkError ? <p className="container flash-msg-text"> ! { props.bookmarkError } </p> : null }        
                { props.shareError ? <p className="container flash-msg-text"> ! { props.shareError } </p> : null }        
                { props.newsError ? <p className="container flash-msg-text"> ! { props.newsError } </p> : null }        
            </div>
            <div className="successMsg">
                { props.bookmarkSuccess ? <p className="container flash-msg-text"> ! { props.bookmarkSuccess } </p> : null }        
                { props.shareSuccess ? <p className="container flash-msg-text"> ! { props.shareSuccess } </p> : null }        
            </div>
        </div>
    );
}

const mapStateToprops = (state) => {
    return {
        newsError: state.news.newsError,
        bookmarkError: state.bookmark.bookmarkError,
        bookmarkSuccess: state.bookmark.bookmarkSuccess,
        shareError: state.share.shareError,
        shareSuccess: state.share.shareSuccess
    }
}

export default connect(mapStateToprops, null)(flashMsg);
