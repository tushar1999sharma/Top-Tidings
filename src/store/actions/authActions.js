import axios from 'axios';
import swal from 'sweetalert';
import jwtDecode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export const postRegister = (data, history) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/signup', data)
            .then(res => {
                console.log(res);
                if (res.data.response !== false && res.data.status !== 404) {               
                    const message = res.data.message;
                    swal({
                        text: message,
                        title: "Success",
                        icon: "success",
                        closeOnClickOutside: true,
                        timer: 1000
                    })
                    .then(() => {
                        localStorage.setItem("token", res.data.jwt);
                        // Set token to Auth header
                        setAuthToken(res.data.jwt);
                        // Decode token to get user data
                        const decoded = jwtDecode(res.data.jwt);
                        //redirect to home
                        history.push("/", true);
                        //dispatch aciton
                        dispatch(logInUser(decoded));
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
                    }).then(() => {
                        history.push("/signup");
                    });
                }
            })
    }
}

export const postLogIn = (data, history) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/signin', data)
            .then(res => {
                console.log(res);
                if (res.data.response !== false && res.data.status !== 404) {
                    const message = res.data.message;
                    swal({
                        text: message,
                        title: "Success",
                        icon: "success",
                        closeOnClickOutside: true,
                        timer: 1000
                    })
                    .then(() => {
                        localStorage.setItem("token", res.data.jwt);
                        // Set token to Auth header
                        setAuthToken(res.data.jwt);
                        // Decode token to get user data
                        const decoded = jwtDecode(res.data.jwt);
                        //redirect to home
                        history.push("/", true);
                        //dispatch aciton
                        dispatch(logInUser(decoded));
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
                    .then(() => {
                        history.push("/signin");
                    });
                }
            })
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

export const authenticateUser = (user) => {
    return (dispatch) => {
        dispatch(logInUser(user));
    }
}

const logInUser = (user) => ({
    type: 'LOGIN_USER',
    payload: user
})