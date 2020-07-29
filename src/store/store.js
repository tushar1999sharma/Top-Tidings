import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'; //for async process in redux
import rootReducer from './reducer/rootReducer';

//for redux dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

//crete store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
