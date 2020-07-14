import axios from 'axios';
import swal from 'sweetalert';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';

export const registerAction = (data, history) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        console.log(process.env.REACT_APP_FB_API);
        console.log(firebase);
        firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then(() => {
                history.push("/");
                dispatch({type: "LOGIN_USER"})          
            })
            .catch(err => {
                console.log(err);
                swal({
                    text: err.message,
                    title: "Error",
                    icon: "error",
                    className: "red-bg",
                    closeOnClickOutside: true,
                    timer: 1000
                })          
            });
    }
}

export const logInAction = (data, history) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        console.log(process.env.REACT_APP_FB_API);
        console.log(firebase);
        firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then(() => {
                history.push("/");
                dispatch({type: "LOGIN_USER"})          
            })
            .catch(err => {
                console.log(err);
                swal({
                    text: err.message,
                    title: "Error",
                    icon: "error",
                    className: "red-bg",
                    closeOnClickOutside: true,
                    timer: 1000
                })          
            });
    }
}

export const postLogOut = (history) => {
    return (dispatch) => {
        axios.post("http://localhost:5000/signout")
            .then(res => {
                console.log(res);
                if(res.data.response !== false && res.data.status !== 404){
                    localStorage.removeItem("token");
                    const message = res.data.message;
                    swal({
                        text: message,
                        title: "Success",
                        icon: "success",
                        closeOnClickOutside: true,
                        timer: 1000
                    })
                    .then(() => {
                        dispatch({ type: 'LOGOUT_USER' })
                    });
                }
                else {
                    const message = res.data.message;
                    console.log(message);
                    swal({
                        text: message,
                        title: "Error",
                        icon: "error",
                        className: "red-bg",
                        closeOnClickOutside: true,
                        timer: 1000
                    })
                }
            })
    }
}