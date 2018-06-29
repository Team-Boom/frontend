import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default class Carousel extends Component {

  static propTypes = {
    movies: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
  };

  render() {
    const { movies, category } = this.props;

    const settings = {
      dots: false,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 10,
      slidesToScroll: 1,
      focusOnSelect: true,
      className: `${category}-slider`,
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

    const carouselCard = (movie, i) => {
      const detailLink = `/movies?id=${movie.imdbID || movie._id}`;
      return (
        <div key={i}>
          <Link to={detailLink}>
            <div className="carousel-card-inner">
              <img className="carousel-image" src={movie.poster}/>
              <h3>{movie.title}</h3>
            </div>
          </Link>
        </div>
      );
    };
    
    return (
      <article className="cat-slider">
        <h2>{category}</h2>
        <Slider {...settings}>
          {movies.map((movie, i) => carouselCard(movie, i))}
        </Slider>
      </article>
    );
  }
}

