import React, { PureComponent } from 'react';
import Header from '../shared/Header';

class Home extends PureComponent {
  
  render() {
    return (
      <div>
        <Header />
        <p>Home Page</p>      
      </div>
    );
  }
}

export default Home;
