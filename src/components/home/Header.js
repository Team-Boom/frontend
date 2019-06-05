import React, { Component } from 'react';
import styles from './Header.scss';
import SearchBar from '../shared/SearchBar';
import logo from '../../assets/images/DeepFocus.png';

export default class Header extends Component {

  render() {
    return (
      <div className={styles.header}>
        <div id='logo-container'>
          <img id='logo' src={logo}/>
        </div>
        <div id='search'>
          <SearchBar />
        </div>
      </div>
    );
  }
}