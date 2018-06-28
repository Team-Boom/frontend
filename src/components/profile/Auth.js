import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin, signup } from './actions';
import { getUser } from './reducers';
import Certification from './Certification';

class Auth extends PureComponent {

    static propTypes = {
      user: PropTypes.object,
      signup: PropTypes.func.isRequired,
      signin: PropTypes.func.isRequired,
      location: PropTypes.object
    };

    render() {

      const { user, signin, signup, location } = this.props;
      const redirect = location.state ? location.state.from : '/';
      const loggedIn = (user && user.token) ? true : false;
      if(loggedIn) return <Redirect to={redirect}/>;

      return (
        <article>
          <Switch>
            <Route path='/auth/signin' component={() => (
              <div>
                <p>Not yet registered? <Link to='/auth/signup'>Sign Up</Link></p>
                <Certification action='Sign In' submit={signin} allowName={false} user={user}/>
              </div>
            )}/>
            <Route path='/auth/signup' render={() => (
              <div>
                <p>Already have an account? <Link to='/auth/signin'>Sign In</Link></p>
                <Certification action='Sign Up' submit={signup} allowName={true} user={user}/>
              </div>
            )}/>
            <Redirect to='/auth/signin'/>
          </Switch>
        </article>
      );
    }
}

export default connect(
  state => ({
    user: getUser(state)
  }),
  { signin, signup }
)(Auth);