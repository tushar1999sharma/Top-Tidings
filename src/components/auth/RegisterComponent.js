import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { 
    registerAction, 
    unMatchedPassAction, 
    signInWithGoogleAction, 
    signInWithGithubAction 
} from '../../store/actions/authActions';

class registerComponent extends Component {
    constructor(props) {
        super(props);
        //create state
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPass: ''
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, then redirect them to dashboard
        //we are also checking through RestrictedRoute
        if (this.props.isAuthenticated) {
            swal({
                text: "You are already logged in",
                title: "Error",
                icon: "error",
                className: "red-bg",
                closeOnClickOutside: true,
                timer: 500
            }).then(() => {
                this.props.history.push("/");
            });
        }
    }

    handleInputChange = (event) => {
        //change state data with change in input
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }

    handleSubmit = (event) => {
        //prevent usual changes in page i.e. refresh on submitting form
        event.preventDefault();
        //check if both time password match or not
        if(this.state.confirmPass !== this.state.password) {
            //send action to create message for error
            this.props.unMatchedPassword();
        }
        else {
            //create object
            const data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPass: this.state.confirmPass
            };
            //send action to create user in database with given details
            this.props.registerPost(data, this.props.history);
        }
    }

    handleGoogleSignInSubmit = () => {
        //action to sing in user with google and save in database
        this.props.signInWithGoogle(this.props.history)
    }
    handleGithubSignInSubmit = () => {
        //action to sing in user with github and save in database
        this.props.signInWithGithub(this.props.history);
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-6 col-md-7 col-sm-8 col-9 mx-auto">
                        <div className="myform form">
                            <div className="logo mb-3">
                                <div className="col-md-12 text-center">
                                    <h1>Register</h1>
                                </div>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" 
                                            name="name"  
                                            placeholder="Enter name"
                                            className="form-control" 
                                            value={this.state.name}
                                            onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" 
                                            name="email"  
                                            placeholder="Enter email"
                                            className="form-control" 
                                            value={this.state.email}
                                            onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" 
                                            name="password" 
                                            placeholder="Enter password"
                                            className="form-control" 
                                            value={this.state.password}
                                            onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" 
                                            name="confirmPass" 
                                            placeholder="Enter password again"
                                            className="form-control" 
                                            value={this.state.confirmPass}
                                            onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="auth-msg errorMsg">
                                    { this.props.authError ? <p>! { this.props.authError }</p> : null }
                                </div>
                                <div className="col-md-12 text-center ">
                                    <button type="submit" className=" btn btn-block mybtn auth-btn tx-tfm">Register</button>
                                </div>
                            </form>
                            <p class="text-center">Alredy have an Account? <Link to="/signin"> Sign in </Link> </p>
                            <p class="text-center">OR</p>
                            <div class="icons-position text-center">
                                <Link onClick={this.handleGithubSignInSubmit}>
                                    <i className="fa fa-github fa-lg"></i>
                                </Link>
                                {' '}
                                <Link onClick={this.handleGoogleSignInSubmit}>
                                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="G" height="23px" width="23px"/>
                                </Link>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>  
        );
    }
}

//take data from redux store to components prop
const mapStateToProps = (state) => {
    console.log(state.auth.authError)
	return {
        authError: state.auth.authError,
	};
};
//dispatch action to change data in redux store
const mapDispatchToProps = (dispatch) => {
    return {
        registerPost: (userInfo, history) => dispatch(registerAction(userInfo, history)),
        unMatchedPassword: () => dispatch(unMatchedPassAction()),
        signInWithGithub: (history) => dispatch(signInWithGithubAction(history)),
        signInWithGoogle: (history) => dispatch(signInWithGoogleAction(history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(registerComponent));
