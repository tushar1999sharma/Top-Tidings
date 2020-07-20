import axios from 'axios';  

export const homeAction = () => {
    return (dispatch) => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then(res => { //handle promise
                dispatch({ type: 'HOME_NEWS', payload: res.data.articles })
                dispatch({ type: 'STOP_SPINNER' })
            })
    }
}

export const queryAction = (query) => {
    return (dispatch) => {
        axios.get(`https://newsapi.org/v2/top-headlines?q=${query}&language=en&apiKey=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then(res => { //handle promise
                dispatch({ type: 'SEARCH_NEWS', payload: res.data.articles })
                dispatch({ type: 'STOP_SPINNER' })
            })
    }
}

export const sourceAction = (srcID) => {
    return (dispatch) => {
        axios.get(`https://newsapi.org/v2/top-headlines?sources=${srcID}&apiKey=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then(res => { //handle promise
                dispatch({ type: 'SOURCE_NEWS', payload: res.data.articles })
                dispatch({ type: 'STOP_SPINNER' })
            })
    }
}

export const categoryAction = (ctgName) => {
    return (dispatch) => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${ctgName}&language=en&apiKey=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then(res => { //handle promise
                dispatch({ type: 'CATEGORY_NEWS', payload: res.data.articles })
                dispatch({ type: 'STOP_SPINNER' })
            })
    }
}