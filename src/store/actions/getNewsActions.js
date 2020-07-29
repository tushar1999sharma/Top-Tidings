import axios from 'axios';  
import moment from 'moment';

const dateFrom = moment().subtract(7,'d').format('YYYY-MM-DD');

export const homeAction = () => {
    return (dispatch) => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then(res => { //handle promise
                dispatch({ type: 'HOME_NEWS', payload: res.data.articles })
                //stop spinner as we get data from our request
                dispatch({ type: 'STOP_SPINNER' })
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: 'NEWS_ERROR', payload: err });
                //clear message after 3 seconds
                setTimeout(() => {
                    dispatch({type: "CLEAR_NEWS_MSG"});    
                }, 3000);
            }) 
    }
}

export const queryAction = (query) => {
    return (dispatch) => {
        axios.get(`https://newsapi.org/v2/everything?q=${query}&from=${dateFrom}&language=en&sortBy=popularity&apiKey=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then(res => { //handle promise
                console.log(res);
                dispatch({ type: 'SEARCH_NEWS', payload: res.data.articles })
                //stop spinner as we get data from our request
                dispatch({ type: 'STOP_SPINNER' })
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: 'NEWS_ERROR', payload: err });
                //clear message after 3 seconds
                setTimeout(() => {
                    dispatch({type: "CLEAR_NEWS_MSG"});    
                }, 3000);
            }) 
        }
}

export const sourceAction = (srcID) => {
    return (dispatch) => {
        axios.get(`https://newsapi.org/v2/top-headlines?sources=${srcID}&apiKey=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then(res => { //handle promise
                dispatch({ type: 'SOURCE_NEWS', payload: res.data.articles })
                //stop spinner as we get data from our request
                dispatch({ type: 'STOP_SPINNER' })
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: 'NEWS_ERROR', payload: err });
                //clear message after 3 seconds
                setTimeout(() => {
                    dispatch({type: "CLEAR_NEWS_MSG"});    
                }, 3000);
            }) 
    }
}

export const categoryAction = (ctgName) => {
    return (dispatch) => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${ctgName}&language=en&apiKey=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then(res => { //handle promise
                dispatch({ type: 'CATEGORY_NEWS', payload: res.data.articles })
                //stop spinner as we get data from our request
                dispatch({ type: 'STOP_SPINNER' })
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: 'NEWS_ERROR', payload: err });
                //clear message after 3 seconds
                setTimeout(() => {
                    dispatch({type: "CLEAR_NEWS_MSG"});    
                }, 3000);
            }) 
    }
}