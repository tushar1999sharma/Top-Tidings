import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'; //for async process in redux
import reducer from './reducer/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //use redux dev tool

const store = createStore(reducer, 
    compose(
        composeEnhancers(applyMiddleware(thunk)),
    )
);

export default store