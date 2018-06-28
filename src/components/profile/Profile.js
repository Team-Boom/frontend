import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../profile/reducers';
import { logout } from '../profile/actions';
import PropTypes from 'prop-types';

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  }

  handleLogout = () => {
    this.props.logout();
  }
  
  render() {
    const { user } = this.props;
    return (
      <div>
        <p>I am a profile</p>
        <div id='links'>
          {
            user
              ? <Link to="/" onClick={this.handleLogout}>Logout</Link>
              : <Link to="/auth">Login</Link>
          } 
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ user: getUser(state) }),
  { logout }
)(Profile);
