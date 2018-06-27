import React, { Component } from 'react';
import styles from './Carousel.scss';


export default class Carousel extends Component {
  componentDidMount() {
    const clickLeft = document.getElementById('controlL');
    const clickRight = document.getElementById('controlR');
    const content = document.getElementById('content');
            
    clickLeft.addEventListener('click', function(event) {
      event.preventDefault();
      content.classList.add('.fa-chevron-left-extra');
    });
            
    clickRight.addEventListener('click', function(event) {
      event.preventDefault();
      content.classList.add('.fa-chevron-right-extra');
    });
  } 
  render() {

        
    return (
      <div className={styles.carousel}>
        <div id="wrapper">
          <span id="controlL" className="left-controls" role="button" aria-label="See Previous Modules">
          </span>
          <div className="module-section clearfix">

            <ul id="content">
              <li className="card"> I work </li>

            </ul>

          </div>
          <span id="controlR" className="right-controls" role="button" aria-label="See Previous Modules">
          </span>

        </div>  
      </div>

    );
  }
}