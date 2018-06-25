import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {

  render() {

    return (
      <footer>
        <nav>
          <a>
            <Link to="/">Home</Link>
          </a>
          <a>
            <Link to="/profile">Profile</Link>
          </a>
          <a>
            <Link to="/watchlist">Watchlist</Link>
          </a>
        </nav>
      </footer>
    );
  }
}