import React, { PureComponent } from 'react';
import Carousel from '../shared/Carousel';
import MovieItem from '../movies/MovieItem';

export default class Browse extends PureComponent {
  
  
  
  render() {
    return (
      <div>
        <Carousel />
        <p>I am Browse</p>      
      </div>
    );
  }
}

