import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { setClass } from '../../utils/responseHelpers';
import styles from './Nav.scss';
import home from '../../assets/icons/home-inactive.png';
import browse from '../../assets/icons/browse-inactive.png';
import profile from '../../assets/icons/profile-inactive.png';
import watchlist from '../../assets/icons/watchlist-inactive.png';
import { connect } from 'react-redux';

class Nav extends Component {

  render() {

    return (
      <article className={styles.nav}>
        <nav className={setClass({
          default: 'top',
          mobileLg: 'bottom'
         }, this.props.breakpoint)}> {/*eslint-disable-line*/}
          <ul>
            <li>
              <img src={home} />
              <Link to="/home" id="home">Home</Link>
            </li>
            <li>
              <img src={profile} />
              <Link to="/profile" id="profile">Profile</Link>
            </li>
            <li>
              <img src={browse} />
              <Link to="/browse" id="browse">Browse</Link>
            </li>
            <li>
              <img src={watchlist} />
              <Link to="/watchlist">Watchlist</Link>
            </li>
          </ul>
        </nav>
      </article>
    ); 
  }
}

export default connect(
  state => ({ breakpoint: state.breakpoint }),
  null,
)(Nav);