import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { 
    registerAction, 
    unMatchedPassAction, 
    signInWithGoogleAction, 
    signInWithFacebookAction 
} from '../../store/actions/authActions';

class registerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPass: ''
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
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
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.confirmPass !== this.state.password) {
            this.props.unMatchedPassword();
        }
        else {
            const data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPass: this.state.confirmPass
            };
            this.props.registerPost(data, this.props.history);
        }
    }

    handleGoogleSignInSubmit = () => {
        this.props.signInWithGoogle(this.props.history)
    }
    handleFacebookSignInSubmit = () => {
        this.props.signInWithFacebook(this.props.history);
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
                                    <button type="submit" className=" btn btn-block mybtn btn-dark tx-tfm">Register</button>
                                </div>
                            </form>
                            <p class="text-center">Alredy have an Account? <Link to="/signin"> Sign in </Link> </p>
                            <p class="text-center">OR</p>
                            <div class="icons-position text-center">
                                <Link onClick={this.handleFacebookSignInSubmit}>
                                    <i className="fab fa-facebook-f fa-lg" style={{color: "#3e11e4"}}></i>
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
//take data to redux store
const mapDispatchToProps = (dispatch) => {
    return {
        registerPost: (userInfo, history) => dispatch(registerAction(userInfo, history)),
        unMatchedPassword: () => dispatch(unMatchedPassAction()),
        signInWithFacebook: (history) => dispatch(signInWithFacebookAction(history)),
        signInWithGoogle: (history) => dispatch(signInWithGoogleAction(history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(registerComponent));
