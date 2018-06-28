import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MovieCard extends PureComponent {

  static propTypes = {
    movie: PropTypes.object.isRequired,
    rating: PropTypes.string, //'view' or 'input'
    reviewed: PropTypes.bool,
    toWatch: PropTypes.bool,
    watched: PropTypes.bool
  };

  render() {
    const { movie } = this.props;
    const detailLink = `/movies?id=${movie.imdbID}`;

    return (
      <div className="movie-card">
        <span> <img src={movie.Poster}/> </span>
        <span> 
          <h2> {movie.Title} </h2>
          <p> {movie.Year} </p>
        </span>
        {this.props.rating ? <span> rating true </span> : null}
        {this.props.reviewed ? <span> reviewed true </span> : null}
        {this.props.toWatch ? <span> toWatch true </span> : null}
        {this.props.watched ? <span> watched true </span> : null}
        <Link to={detailLink}>
          <span className="detail-next"> ⇨ </span> 
        </Link>
      </div>
    );
  }
}

export default MovieCard;