import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Tasks from './Tasks';
import Login from './Login';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Tasks} />
          <PublicRoute exact path="/login" component={Login} loggedIn={this.props.loggedIn} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

const PublicRoute = ({ component: PublicComponent, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !loggedIn
      ? (
         <PublicComponent {...props} />
      )
      : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
    )}
  />
);

export default connect(mapStateToProps)(App);
