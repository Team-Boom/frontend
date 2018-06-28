import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Header.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../profile/reducers';
import { logout } from '../profile/actions';
import SearchBar from './SearchBar';
import logo from '../../assets/images/DeepFocus.png';

class Header extends Component {

    
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
      <div className={styles.header}>
        <div id='box1'>
          <img id='logo' src={logo}/>
        </div>
        <div id='search'>
          <SearchBar />
        </div>
        <div>
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
)(Header);
