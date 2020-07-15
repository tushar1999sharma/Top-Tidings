import axios from 'axios';
import swal from 'sweetalert';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';

export const registerAction = (data, history) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then((resp) => {
                //store other user detail in firestore with collection name "user"
                return firestore
                        .collection("user")
                        .doc(resp.user.uid)
                        .set({
                            name: data.name
                        })
            }).then(() => {
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

export const logOutAction = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        console.log(process.env.REACT_APP_FB_API);
        console.log(firebase);
        firebase
            .auth()
            .signOut()
            .then(() => {
                //history.push("/");
                dispatch({type: "LOGOUT_USER"})          
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