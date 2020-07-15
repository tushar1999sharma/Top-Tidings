import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { registerAction, unMatchedPassAction, signInWithGoogle } from '../../store/actions/authActions';

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
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <div className="myform form ">
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
                                <div className="center text-danger">
                                    { this.props.authError ? <p>something went wrong</p> : null }
                                </div>
                                <div className="col-md-12 text-center ">
                                    <button type="submit" className=" btn btn-block mybtn btn-dark tx-tfm">Register</button>
                                </div>
                            </form>
                            <p class="text-center">Alredy have an Account? <Link to="/signin"> Sign in </Link> </p>
                            <p class="text-center">OR</p>
                            <div class="icons-position">
                                {/* <a onClick={}>
                                    <p class="text-center">
                                        <i class="fab fa-facebook-f fa-lg" style="color:#3e11e4;"></i>
                                    </p>
                                </a> */}
                                <Link to="" onClick={this.props.signInWithGoogle(this.props.history)}>
                                    <p class="text-center">
                                        <img src="https://img.icons8.com/color/48/000000/google-logo.png" height="20px" width="20px"/>
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
        authError: state.auth.authError,
	};
};
//take data to redux store
const mapDispatchToProps = (dispatch) => {
    return {
        registerPost: (userInfo, history) => dispatch(registerAction(userInfo, history)),
        unMatchedPassword: () => dispatch(unMatchedPassAction()),
        signInWithGoogle: (history) => dispatch(signInWithGoogle(history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(registerComponent));
