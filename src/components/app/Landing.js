import React, { PureComponent } from 'react';
import logo from '../../assets/images/DeepFocus.png';
import styles from './Landing.scss';
import SearchBar from '../shared/SearchBar';
import Nav from '../nav/Nav';

export default class Landing extends PureComponent {

  render() {
    return (
      <section className={styles.landing}>
        <Nav/>
        <div id="logo-container">
          <img src={logo} />
        </div>
        <div id="blurb">
          <h1>Movie reviews for the technical enthusiast</h1>
          <p>A deep focus shot clearly renders all planes of depth, from the foreground to extreme-background, to highlight contrasting perspectives of near and far. Like this technique, our hope is to allow users to review a film and bring depth to critique by allowing a forum for technical merits.</p>
          <q> “If it can be written or thought, it can be filmed.”</q>
          <cite> – Stanley Kubrick</cite>      
        </div>
        <div id="search">
          <SearchBar/>
        </div>
      </section>
    );
  }
}