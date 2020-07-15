import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import swal from 'sweetalert';
import { logInAction, signInWithGoogle } from "../../store/actions/authActions";

class logInComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
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
                this.props.history.push("/signup");
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
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(data);
        console.log(this.props);
        this.props.LogInPost(data, this.props.history);
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <div className="myform form ">
                            <div className="logo mb-3">
                                <div className="col-md-12 text-center">
                                    <h1>Log In</h1>
                                </div>
                            </div>
                            <form onSubmit={this.handleSubmit}>
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
                                <div className="center text-danger">
                                    { this.props.authError ? <p>wrong id or password</p> : null }
                                </div>
                                <div className="col-md-12 text-center ">
                                    <button type="submit" className=" btn btn-block mybtn btn-dark tx-tfm">Login</button>
                                </div>
                            </form>
                            <p class="text-center">Wanna create new account? <Link to="/signup"> Sign in </Link></p>
                            <p class="text-center">OR</p>
                            <div class="icons-position">
                                {/* <a onClick={}>
                                    <p class="text-center">
                                        <i class="fab fa-facebook-f fa-lg" style="color:#3e11e4;"></i>
                                    </p>
                                </a> */}
                                <Link to="" onClick={this.props.signInWithGoogle(this.props.history)}>
                                    <p class="text-center">
                                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="G" height="20px" width="20px"/>
                                    </p>
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
	return {
        authError: state.auth.authError
	};
};
//take data to redux store
const mapDispatchToProps = (dispatch) => {
    return {
        LogInPost: (history, userInfo) => dispatch(logInAction(history, userInfo)),
        signInWithGoogle: (history) => dispatch(signInWithGoogle(history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(logInComponent));
