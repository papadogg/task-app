import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';

class Login extends Component {
  state = {
    login: '',
    password: '',
    error: 'Unable to login. Either username or password is incorrect'
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.authActions.hideError();
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { login, password } = this.state;
    this.props.authActions.login(login, password);
  }

  render() {
    return (
      <div className='loginForm'>
        <h3>Login</h3>
        <form onSubmit={this.submitHandler}>
          <div className='form-group'>
            <input name='login' className='form-control' placeholder='Login' value={this.state.email} onChange={this.changeHandler} />
          </div>
          <div className='form-group'>
            <input type='password' className='form-control' name='password' placeholder='Password' value={this.state.password} onChange={this.changeHandler} />
          </div>
          {this.props.auth.loginError && <p className='error'>{this.state.error}</p>}
          <button className='btn btn-primary align-self-center'>Login</button>
        </form>
        <Link className='link' to='/'>Go Back</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
