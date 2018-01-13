import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as authActions from '../actions/auth';

class Header extends Component {
  logout = () => {
    this.props.authActions.logout();
  }
  renderHeader = () => {
    return this.props.auth.loggedIn ?
    <button className='btn btn-outline-danger my-2 my-sm-0' onClick={this.logout}>Logout</button> :
    <Link className='btn btn-outline-success my-2 my-sm-0' to='/login'>Login</Link>;
  }
  render() {
    return (
      <nav className='navbar navbar-light bg-light'>
        <Link className='navbar-brand' to='/'>Tasks</Link>
        {this.renderHeader()}
      </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
