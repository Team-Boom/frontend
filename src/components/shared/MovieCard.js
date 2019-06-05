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
import noImage from '../../assets/images/no-image-found.png';
import styles from './cardInner.scss';

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
  };

  handleWLAdd = () => {
    this.props.addToWatchList(this.props.movie, this.props.user._id); //send movie as well
  };

  handleWLRemove = () => {
    this.props.removeFromWatchList(this.props.user, this.props.movie.imdbID || this.props.movie.movieId);
  };



  render() {
    const { movie, ticRating, reviewType, user, watchAdd, watchRemove } = this.props;
    const detailLink = `/movies?id=${movie.imdbID ||  movie.movieId || movie._id}`; 
    const reviewLink = `/movies/${movie.imdbID ||  movie.movieId || movie._id}/write`;
    const poster = () => {
      let image = movie.Poster || movie.poster;
      if(!image || image === 'N/A') image = noImage;
      return image;
    };

    return (
      <div className={styles.cardInner}>
        <span className="poster-container"> 
          <img className="poster" src={poster()}/> 
        </span>
        <span className="text"> 
          <h2> {movie.Title || movie.title} </h2>
          <p> {movie.Plot || movie.description || movie.Year} </p>
        </span>
        {ticRating ? <Tickets type='view' current={ticRating}/> : null}
        {user && watchAdd ? <img className="clickable icon" src={watchlist} onClick={this.handleWLAdd} alt="add to your watchlist"/> : null}
        {watchRemove ? <img className="clickable icon" src={remove} onClick={this.handleWLRemove} alt="remove from watchlist"/> : null}
        {reviewType ? <Link to={reviewLink}><img className="clickable icon" src={toReview} alt={`${reviewType} review`}/></Link> : null}
        <Link to={detailLink}>
          <img className="clickable icon" src={toDetail}/>
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