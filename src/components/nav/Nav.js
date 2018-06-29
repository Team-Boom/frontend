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
          default: 'nav',
          tabletSm: 'bottom'
         }, this.props.breakpoint)}> {/*eslint-disable-line*/}
          <ul>
            <li>
              <Link to="/home" id="home">
                <img src={home} />
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" id="profile">
                <img src={profile} />
                Profile
              </Link>
            </li>
            <li>
              <Link to="/browse" id="browse">
                <img src={browse} />
                Browse
              </Link>
            </li>
            <li>
              <Link to="/watchlist">
                <img src={watchlist} />
                Watchlist
              </Link>
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