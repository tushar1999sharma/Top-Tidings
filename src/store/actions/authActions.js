import swal from 'sweetalert';
import {
    auth,
    firebase,
    firestore,
    googleProvider,
    githubProvider
} from '../../config/fbConfig'

export const registerAction = (data, history) => {
    return (dispatch) => {
        auth
            .createUserWithEmailAndPassword(data.email, data.password)
            .then((res) => {
                console.log(res);
                //store other user detail in firestore with collection name "user"
                firestore
                    .collection("users")
                    .doc(res.user.uid)
                    .set({
                        name: data.name,
                        email: data.email,
                        createdAt: Date.now(),
                        bookmark: []
                    })
            })
            .then(() => {
                dispatch({type: "REGISTER_SUCCESS"});
                swal({
                    text: "Successfully registered to Top tidings",
                    title: "Success",
                    icon: "success",
                    closeOnClickOutside: true,
                    timer: 1500
                })
                history.push("/");
            })
            .catch(err => {
                console.log(err);
                dispatch({type: "REGISTER_ERROR", payload: err}); 
                setTimeout(() => {
                    dispatch({type: "CLEAR_AUTH_MSG"});    
                }, 3000);                 
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
                    timer: 1500
                })   
                history.push("/"); 
            })
            .catch(err => {
                console.log(err);
                dispatch({type: "LOGIN_ERROR", payload: err});  
                setTimeout(() => {
                    dispatch({type: "CLEAR_AUTH_MSG"});    
                }, 3000);    
            });
    }
}

export const signInWithGoogleAction = (history) => {
    return (dispatch) => {
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((res) => {
                console.log(res);
                var user = res.additionalUserInfo
                if (user.isNewUser) {
                    firestore
                        .collection('users')
                        .doc(res.user.uid)
                        .set({
                            name: user.profile.name,
                            email: user.profile.email,
                            bookmark: [],
                            createdAt: Date.now(),
                            provider: 'google',
                        })
                }
            })
            .then(() => {
                dispatch({ type: 'LOGIN_SUCCESS' });
                swal({
                    text: "Successfully logged in to Top tidings",
                    title: "Success",
                    icon: "success",
                    closeOnClickOutside: true,
                    timer: 1500
                })
                history.push('/')
            })
            .catch(err => {
                console.log(err);
                dispatch({type: "LOGIN_ERROR", payload: err});
                setTimeout(() => {
                    dispatch({type: "CLEAR_AUTH_MSG"});    
                }, 3000);         
            });
    }
}

export const signInWithGithubAction = (history) => {
    return (dispatch) => {
        firebase
            .auth()
            .signInWithPopup(githubProvider)
            .then((res) => {
                console.log(res);
                var user = res.additionalUserInfo
                if (user.isNewUser) {
                    firestore
                        .collection('users')
                        .doc(res.user.uid)
                        .set({
                            name: user.profile.name,
                            email: user.profile.email,
                            bookmark: [],
                            createdAt: Date.now(),
                            provider: 'github',
                        })
                }
            })
            .then(() => {
                dispatch({ type: 'LOGIN_SUCCESS' });
                swal({
                    text: "Successfully logged in to Top tidings",
                    title: "Success",
                    icon: "success",
                    closeOnClickOutside: true,
                    timer: 1500
                })
                history.push('/')
            })
            .catch(err => {
                console.log(err);
                dispatch({type: "LOGIN_ERROR", payload: err});     
                setTimeout(() => {
                    dispatch({type: "CLEAR_AUTH_MSG"});    
                }, 3000);    
            });
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
                    timer: 1500
                })
                history.push("/");
            })
            .catch(err => {  
                console.log(err);
                dispatch({type: "LOGOUT_ERROR", payload: err});  
                setTimeout(() => {
                    dispatch({type: "CLEAR_AUTH_MSG"});    
                }, 3000);                 
            });
    }
}

export const unMatchedPassAction = () => {
    return (dispatch) => {
        dispatch({type: "LOGOUT_ERROR", payload: {message: "Password not match"}});                   
    }
}