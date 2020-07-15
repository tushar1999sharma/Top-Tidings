import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'; //for async process in redux
import reducer from './reducer/rootReducer';
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { fbConfig } from "../config/fbConfig";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //use redux dev tool

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store
