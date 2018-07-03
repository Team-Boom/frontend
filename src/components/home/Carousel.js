import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Carousel.scss';

// Avoid recreating this function every time component re-renders.
// Also, this is functional component, so TitleCase
const CarouselCard = ({ movie, hidden }) => {
  return (
    <article className="carousel-card" hidden={hidden}>
      <Link to={`/movies?id=${movie.imdbID || movie._id}`}>
        <div className="carousel-card-inner">
          <h3 className="hover">{movie.title}</h3>
        </div>
        <img src={movie.poster}/>
      </Link>
    </article>
  );
};

export default class Carousel extends PureComponent {

  static propTypes = {
    movies: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
  };

  state = {
    imageSpot: 0
  };

  handlePrev = () => {
    this.setState({ imageSpot: this.state.imageSpot - 1 });
  };

  handleNext = () => {
    this.setState({ imageSpot: this.state.imageSpot + 1 });
  };

  render() {
    const { movies, category } = this.props;

    const { imageSpot } = this.state;

    if(!movies) return null;

    return (
      <div className={styles.carousel}>
        <h2>Top {category.replace(/^\w/, c => c.toUpperCase())}</h2>
        <div className="carousel-inner">
          <span className="button left">
            {(!!imageSpot) && <button onClick={this.handlePrev}>&lt;</button>}
          </span>

          {movies.map((movie, i) => <CarouselCard key={movie._id} movie={movie} hidden={i !== imageSpot}/>)}
          
          <span className="button right">
            {(movies.length > 1) && (imageSpot !== movies.length - 1) && <button onClick={this.handleNext}>&gt;</button>}
          </span>
        </div>
      </div>
    );
  }
}
