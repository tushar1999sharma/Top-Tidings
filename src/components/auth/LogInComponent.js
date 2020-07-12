import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import swal from 'sweetalert';
import { postLogIn } from "../../store/actions/authActions";

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
                                <div className="col-md-12 text-center ">
                                <button type="submit" className=" btn btn-block mybtn btn-dark tx-tfm">Login</button>
                                </div>
                            </form>
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
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
	};
};
//take data to redux store
const mapDispatchToProps = (dispatch) => {
    return {
        LogInPost: (props, userInfo) => dispatch(postLogIn(props, userInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(logInComponent));
