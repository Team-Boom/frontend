import React, { PureComponent } from 'react';
import Carousel from '../shared/Carousel';

class Home extends PureComponent {
  
  render() {
    return (
      <div>
        <p>Home Page</p>     
        <Carousel />
        <p>I am Browse</p>       
      </div>
    );
  }
}

export default Home;
