import React, { PureComponent } from 'react';
import logo from '../../assets/images/DeepFocus.png';
import styles from './Landing.scss';
import SearchBar from '../shared/SearchBar';

export default class Landing extends PureComponent {

  render() {
    return (
      <section className={styles.landing}>
        <div id="container">
          <img src={logo} />
        </div>
        <div id="blurb">
          <h2>Movie reviews for the technical enthusiast</h2>
          <p>A deep focus shot clearly renders all planes of depth, from the foreground to extreme-background, to highlight contrasting perspectives of near and far. Like this technique our hope is to allow users to review a film and bring depth to the critique by allowing a forum for technical merits.</p>
        </div>
        <div id="search">
          <SearchBar/>
        </div>
      </section>
    );
  }
}