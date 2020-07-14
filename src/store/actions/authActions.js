import axios from 'axios';
import swal from 'sweetalert';

export const postRegister = (data, history) => {
    return (dispatch, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            data.email,
            data.password
        ).then(() => {
            dispatch({type: "LOGIN_USER"})
        }).catch((err) => {
            swal({
                text: 'Somethis went wrong in logging user',
                title: "Error",
                icon: "error",
                className: "red-bg",
                closeOnClickOutside: true,
                timer: 1000
            })
        });
    }
}

export const postLogIn = (data, history) => {
    return (dispatch, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            data.email,
            data.password
        ).then(() => {
            dispatch({type: "LOGIN_USER"})
        }).catch((err) => {
            swal({
                text: 'Somethis went wrong in logging user',
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