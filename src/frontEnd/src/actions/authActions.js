import axios from 'axios';
import swal from 'sweetalert';

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
                        history.push("/", true);
                        localStorage.setItem("token", res.data.jwt);
                        dispatch({ type: 'REGISTER_USER' });
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
                        /* // Set token to Auth header
                        setAuthToken(token);
                        // Decode token to get user data
                        const decoded = jwt_decode(token); */
                        history.push("/", true);
                        dispatch(logInUser(res.data.user));
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
                if(res.data.response !== false && res.data.status !== 400){
                    const message = res.data.message;
                        swal({
                            text: message,
                            title: "Success",
                            icon: "success",
                            closeOnClickOutside: true,
                            timer: 1000
                        })
                        .then(() => {
                            history.push("/", true);
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
                    .then(() => {
                        history.push("/");
                    });
                }
            })
    }
}

const logInUser = (user) => ({
    type: 'LOGIN_USER',
    payload: user
})