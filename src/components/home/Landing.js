import React, { PureComponent } from 'react';
import logo from '../../assets/images/DeepFocus.png';
import styles from './Landing.scss';

export default class Landing extends PureComponent {

  render() {
    return (
      <section className={styles.landing}>
        <div id="container">
          <img src={logo} />
          <p>Landing Page</p>
        </div>
      </section>
    );
  }
}