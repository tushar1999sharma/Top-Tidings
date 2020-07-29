import { firebase, firestore } from '../../config/fbConfig';

export const handleBookmarkAction = (currentUser, news) => {
    //first find if news with url is already present in this
    //if it present then remove it else add it to bookmark
    return (dispatch) => {
        const userID = currentUser.auth.uid;
        const userRef = firestore.collection("users").doc(`${userID}`);
        firestore
            .collection("users")
            .doc(`/${userID}`)
            .get()
            .then((res) => {
                let flag = 0;
                res.data().listOfBookmarks.forEach(element => {
                    if(element.url === news.url) {
                        flag = 1;
                    }
                });
                if(flag === 1) {
                    //since present then remove from bookmark array
                    userRef.update({
                        listOfBookmarks: firebase.firestore.FieldValue.arrayRemove(news)
                    })
                    dispatch({type: "BOOKMARK_SUCCESS", payload: "Bookmark successfully removed"});
                    setTimeout(() => {
                        dispatch({type: "CLEAR_BOOKMARK_MSG"});    
                    }, 3000);
                }
                else {
                    console.log("add bookmark");
                    //since not present then add into bookmark array
                    userRef.update({
                        listOfBookmarks: firebase.firestore.FieldValue.arrayUnion(news)
                    })
                    dispatch({type: "BOOKMARK_SUCCESS", payload: "Bookmark successfully added"});
                    //clear message after 3 seconds
                    setTimeout(() => {
                        dispatch({type: "CLEAR_BOOKMARK_MSG"});    
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
                dispatch({type: "BOOKMARK_ERROR", payload: err});
                //clear message after 3 seconds
                setTimeout(() => {
                    dispatch({type: "CLEAR_BOOKMARK_MSG"});    
                }, 3000);
            });
    }
    
}

export const addBookmarkAction = () => {
    return (dispatch) => {
        dispatch({type: "BOOKMARK_SUCCESS", payload: "Bookmark successfully added"});
        //clear message after 3 seconds
        setTimeout(() => {
            dispatch({type: "CLEAR_BOOKMARK_MSG"});    
        }, 3000);
    }
    
}

export const removeBookmarkAction = () => {
    return (dispatch) => {
        dispatch({type: "BOOKMARK_SUCCESS", payload: "Bookmark successfully removed"});
        //clear message after 3 seconds
        setTimeout(() => {
            dispatch({type: "CLEAR_BOOKMARK_MSG"});    
        }, 3000);
    }
}

export const bookmarkErrorAction = (err) => {
    return (dispatch) => {
        dispatch({type: "BOOKMARK_ERROR", payload: err});
        //clear message after 3 seconds
        setTimeout(() => {
            dispatch({type: "CLEAR_BOOKMARK_MSG"});    
        }, 3000);
    }
}