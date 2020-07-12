import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import authReducer from './authReducer';
import bookmarkReducer from './bookmarkReducer';
import spinnerReducer from './spinnerReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    news: newsReducer,
    bookmark: bookmarkReducer,
    spinner: spinnerReducer
})

export default rootReducer