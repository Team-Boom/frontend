import React, { PureComponent } from 'react';
import Carousel from '../shared/Carousel';
import Tickets from '../shared/Tickets';
class Home extends PureComponent {
  
  render() {
    return (
      <div>
        <p>Home Page</p>     
        <Tickets type='view' current='4' />
        <p>I am Browse</p>       
      </div>
    );
  }
}

export default Home;
