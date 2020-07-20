import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import newsReducer from './newsReducer';
import authReducer from './authReducer';
import bookmarkReducer from './bookmarkReducer';
import shareReducer from './shareReducer';
import spinnerReducer from './spinnerReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    news: newsReducer,
    bookmark: bookmarkReducer,
    share: shareReducer,
    spinner: spinnerReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer