import swal from 'sweetalert';
import {
    auth,
    firebase,
    firestore,
    googleProvider,
} from '../../config/fbConfig'

export const registerAction = (data, history) => {
    return (dispatch) => {
        auth
            .createUserWithEmailAndPassword(data.email, data.password)
            .then((res) => {
                console.log("Register kr gya");
                //store other user detail in firestore with collection name "user"
                firestore
                    .collection("user")
                    .doc(res.user.uid)
                    .set({
                        name: data.name,
                        email: data.email,
                        createdAt: Date.now()
                    })
                    return res.user.uid
            })
            .then(() => {
                console.log("regoiter krne aaya");
                dispatch({type: "REGISTER_SUCCESS"});   
                swal({
                    text: "Successfully registered to Top tidings",
                    title: "Success",
                    icon: "success",
                    closeOnClickOutside: true,
                    timer: 1000
                })
                history.push("/");
            })
            .catch(err => {
                console.log(err);
                dispatch({type: "REGISTER_ERROR", payload: err});                 
            })
    }
}

export const logInAction = (data, history) => {
    return (dispatch) => {
        auth
            .signInWithEmailAndPassword(data.email, data.password)
            .then(() => {
                dispatch({type: "LOGIN_SUCCESS"}); 
                swal({
                    text: "Successfully logged in to Top tidings",
                    title: "Success",
                    icon: "success",
                    closeOnClickOutside: true,
                    timer: 1000
                })   
                history.push("/"); 
            })
            .catch(err => {
                console.log(err);
                dispatch({type: "LOGIN_ERROR", payload: err});     
            });
    }
}

export const signInWithGoogle = (history) => {
    return (dispatch) => {
        /* firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((res) => {
                var user = res.additionalUserInfo
                if (user.isNewUser) {
                    firestore
                        .collection('users')
                        .doc(res.user.uid)
                        .set({
                            name: user.profile.name,
                            email: user.profile.email,
                            createdAt: Date.now(),
                            provider: 'google',
                        })
                }
            })
            .then(() => {
                history.push('/')
                dispatch({ type: 'LOGIN_SUCCESS' })
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
            }); */
    }
}

export const logOutAction = (history) => {
    return (dispatch) => {
        auth
            .signOut()
            .then(() => {
                dispatch({type: "LOGOUT_SUCCESS"});
                swal({
                    text: "Successfully logged out from Top tidings",
                    title: "Success",
                    icon: "success",
                    closeOnClickOutside: true,
                    timer: 1000
                })
                history.push("/");
            })
            .catch(err => {  
                console.log(err);
                dispatch({type: "LOGOUT_ERROR", payload: err});                   
            });
    }
}

export const unMatchedPassAction = () => {
    return (dispatch) => {
        dispatch({type: "LOGOUT_ERROR", payload: {message: "Password not match"}});                   
    }
}