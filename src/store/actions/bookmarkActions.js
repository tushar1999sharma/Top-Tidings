import { firebase, firestore } from '../../config/fbConfig';

export const handleBookmarkAction = (currentUser, news) => {
    //first find if news with url is already present in this
    //if it present then remove it else add it to bookmark
    return (dispatch) => {
        const userID = currentUser.auth.uid;
        const userRef = firestore.collection("bookmarks").doc(`${userID}`);
        firestore
            .collection("bookmarks")
            .doc(`/${userID}`)
            /* .where("bookmark", "array-contains", news) */
            .get()
            .then((res) => {
                console.log(res.data());
                let flag = 0;
                res.data().listOfBookmark.forEach(element => {
                    console.log("bookmark ", element.url, news.url);
                    if(element.url === news.url) {
                        flag = 1;
                    }
                });
                if(flag === 1) {
                    console.log("delete bookmark");
                    userRef.update({
                        listOfBookmark: firebase.firestore.FieldValue.arrayRemove(news)
                    })
                    dispatch({type: "BOOKMARK_SUCCESS", payload: "Bookmark successfully removed"});
                    setTimeout(() => {
                        dispatch({type: "CLEAR_BOOKMARK_MSG"});    
                    }, 3000);
                }
                else {
                    //since not present then add into bookmark array
                    userRef.update({
                        listOfBookmark: firebase.firestore.FieldValue.arrayUnion(news)
                    })
                    dispatch({type: "BOOKMARK_SUCCESS", payload: "Bookmark successfully added"});
                    setTimeout(() => {
                        dispatch({type: "CLEAR_BOOKMARK_MSG"});    
                    }, 3000);
                }
            }).catch((err) => {
                dispatch({type: "BOOKMARK_ERROR", payload: err});
                console.log(err);
            });
    }
    
}

export const addBookmarkAction = () => {
    return (dispatch) => {
        dispatch({type: "BOOKMARK_SUCCESS", payload: "Bookmark successfully added"});
        setTimeout(() => {
            dispatch({type: "CLEAR_BOOKMARK_MSG"});    
        }, 3000);
    }
    
}

export const removeBookmarkAction = () => {
    return (dispatch) => {
        dispatch({type: "BOOKMARK_SUCCESS", payload: "Bookmark successfully removed"});
        setTimeout(() => {
            dispatch({type: "CLEAR_BOOKMARK_MSG"});    
        }, 3000);
    }
}

export const bookmarkErrorAction = (err) => {
    return (dispatch) => {
        dispatch({type: "BOOKMARK_ERROR", payload: err});
        setTimeout(() => {
            dispatch({type: "CLEAR_BOOKMARK_MSG"});    
        }, 3000);
    }
}