import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tickets from '../shared/Tickets';
import watchlist from '../../assets/icons/watchlist-active.png';
import remove from '../../assets/icons/x-out.png';
import toReview from '../../assets/icons/write-review.png';
import toDetail from '../../assets/icons/detail-link.png';
import { connect } from 'react-redux';
import { addToWatchList, removeFromWatchList } from '../profile/actions';
import { getUser } from '../profile/reducers';
import styles from './MovieCard.scss';

class MovieCard extends PureComponent {

  static propTypes = {
    addToWatchList: PropTypes.func.isRequired,
    removeFromWatchList: PropTypes.func.isRequired,
    user: PropTypes.object,
    movie: PropTypes.object.isRequired,
    ticRating: PropTypes.number,
    watchAdd: PropTypes.bool,
    watchRemove: PropTypes.bool,
    reviewType: PropTypes.string, //add or edit
    review: PropTypes.object, //if editing
  };

  handleWLAdd = () => {
    this.props.addToWatchList(this.props.movie, this.props.user._id); //send movie as well
  };

  handleWLRemove = () => {
    this.props.removeFromWatchList(this.props.user, this.props.movie.imdbID || this.props.movie.movieId);
  };

  handleReview = () =>{
    this.props.review;
    this.props.reviewType;
  }

  render() {
    const { movie, ticRating, reviewType, user } = this.props;
    const detailLink = `/movies?id=${movie.imdbID || movie._id}`;

    return (
      <div className={styles.card}>
        <span> <img src={movie.Poster || movie.poster }/> </span>
        <span> 
          <h2> {movie.Title || movie.title} </h2>
          <p> {movie.Plot || movie.description || movie.Year} </p>
        </span>
        {this.props.ticRating ? <Tickets type='view' current={ticRating}/> : null}
        {user && this.props.watchAdd ? <img className="clickable icon" src={watchlist} onClick={this.handleWLAdd} alt="add to your watchlist"/> : null}
        {this.props.watchRemove ? <img className="clickable icon" src={remove} onClick={this.handleWLRemove} alt="remove from watchlist"/> : null}
        {this.props.reviewType ? <img className="clickable icon" src={toReview} onClick={this.handleReview} alt={`${reviewType} review`}/> : null}
        <Link to={detailLink}>
          <img className="clickable" src={toDetail}/>
        </Link>
      </div>
    );
  }
}

export default connect(
  state => ({
    user: getUser(state),
  }),
  { addToWatchList, removeFromWatchList }
)(MovieCard);