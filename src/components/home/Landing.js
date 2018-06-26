import React, { PureComponent } from 'react';
import logo from '../images/DeepFocus.png';
import styles from './Landing.scss';

export default class Landing extends PureComponent {

  render() {
    return (
      <section>
        <div className={styles.landing}>
          <img src={logo} />
          <p>Landing Page</p>
        </div>
      </section>
    );
  }
}