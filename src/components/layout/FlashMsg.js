import React from 'react';
import { connect } from "react-redux";

const flashMsg = (props) => {
    return (
        <div className="sticky-top">
            <div className="errorMsg">
                { props.bookmarkError ? <p> ! { props.bookmarkError } </p> : null }        
                { props.shareError ? <p> ! { props.shareError } </p> : null }        
            </div>
            <div className="successMsg">
                { props.bookmarkSuccess ? <p> ! { props.bookmarkSuccess } </p> : null }        
                { props.shareSuccess ? <p> ! { props.shareSuccess } </p> : null }        
            </div>
        </div>
    );
}

const mapStateToprops = (state) => {
    return {
        bookmarkError: state.bookmark.bookmarkError,
        bookmarkSuccess: state.bookmark.bookmarkSuccess,
        shareError: state.share.shareError,
        shareSuccess: state.share.shareSuccess
    }
}

export default connect(mapStateToprops, null)(flashMsg);
