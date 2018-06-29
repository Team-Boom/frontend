import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default class Carousel extends Component {

  static propTypes = {
    movies: PropTypes.array.isRequired,
  };

  render() {
    const settings = {
      dots: false,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesPerRow: 10,
      slidesToShow: 4,
      slidesToScroll: 1,
      focusOnSelect: true,
      className: 'C',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    const { movies } = this.props;

    const carouselCard = (movie, i) => {
      const detailLink = `/movies?id=${movie.imdbID || movie._id}`;
      return (
        <div className="carousel-card" key={i}>
          <Link to={detailLink}>
            <div className="carousel-card-inner">
              <img src={movie.poster}/>
              <h3>{movie.title}</h3>
            </div>
          </Link>
        </div>
      );
    };
    
    return (
      <article className="cat-slider">
        {/* category */}
        <Slider {...settings}>
          {this.props.movies.map((movie, i) => carouselCard(movie, i))}
        </Slider>
      </article>
    );
  }
}

