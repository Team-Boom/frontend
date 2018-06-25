import React, { PureComponent } from 'react';
import logo from '../images/DeepFocus.png';

export default class Home extends PureComponent {

  render() {
    return (
      <section>
        <div>
          <img src={logo} />
          <p>Home Page</p>
        </div>
      </section>
    );
  }
}