import React, { PureComponent } from 'react';
import logo from '../images/DeepFocus.png';

export default class Landing extends PureComponent {

  render() {
    return (
      <section>
        <div>
          <img src={logo} />
          <p>Landing Page</p>
        </div>
      </section>
    );
  }
}