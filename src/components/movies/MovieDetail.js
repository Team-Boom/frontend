import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { loadDetail } from '../movies/actions';
import { getMovie } from '../movies/reducers';
import { loadReviewsByMovie } from '../reviews/actions';
import { getReviewsByMovie } from '../reviews/reducers';
import { categories, categoriesAll, exRatingsDic } from '../shared/constants';
import FormControl from '../shared/FormControl';
import queryString from 'query-string';
import ReviewItem from '../reviews/ReviewItem';
import Tickets from '../shared/Tickets';
import { addToWatchList } from '../profile/actions';
import watchlist from '../../assets/icons/watchlist-active.png';
import { getUser } from '../profile/reducers';

class MovieDetail extends PureComponent {

  static propTypes = {
    movie: PropTypes.object,
    location: PropTypes.object.isRequired,
    loadDetail: PropTypes.func.isRequired,
    loadReviewsByMovie: PropTypes.func.isRequired,
    addToWatchList: PropTypes.func.isRequired,
    reviews: PropTypes.array,
    user: PropTypes.object,
  };

  state = {
    id: null,
    reviewsCat: 'All',
  }

  componentDidMount() {
    const search = this.props.location.search;
    const { id } = queryString.parse(search);
    this.setState({ id: id });
    this.props.loadDetail(id);
    this.props.loadReviewsByMovie(id);
  }

  handleCat = ({ target }) => {
    this.setState({ reviewsCat: target.value }, () => {
      let cat = this.state.reviewsCat === 'All' ? null : this.state.reviewsCat;
      this.props.loadReviewsByMovie(this.state.id, cat);
    });
  }

  handleWLAdd = () => {
    this.props.addToWatchList(this.props.movie, this.props.user._id); //send movie as well
  };

  render() {
    const { movie, reviews, user } = this.props;
    const { focusAvgs } = movie;
    const { id } = this.state;
    const reviewLink = `movies/${id}/write`;
    const renderAvg = (cat, i) => (<span key={i}>{cat} <Tickets type='view' current={focusAvgs[cat]}/></span>);

    if(!movie) return null;
    return (
      <section className="movie-page">
        <div id="movie-page-top">
          <img src={movie.Poster}/>
          <h2>{movie.Title}</h2>
          {user ? <img className="clickable" src={watchlist} onClick={this.handleWLAdd} alt="add to your watchlist"/> : null}
        </div>
        <div id="movie-page-content">
          <h3>Released: {movie.Released}</h3>
          <h3>Director: {movie.Director}</h3>
          <h3>Cast: {movie.Actors}</h3>
          <p> {movie.Plot}</p>
          {movie.Ratings ? (<div className="ex-ratings">
            {movie.Ratings.map((ex, i) => <span className="ex-rating" key={i}> <img className="ex-icon" src={exRatingsDic[ex.Source]}/>{ex.Value}</span>)}
          </div>) : null }
        </div>
        <Link to={reviewLink}> Write a review! </Link>

        <section id="movie-page-reviews">
          { reviews.length
            ? (
              <div id="movie-averages">
                {focusAvgs && (<h3>DeepFocus averages:</h3>)}
                {focusAvgs && categories.map((cat, i) =>{ 
                  return focusAvgs[cat] ? renderAvg(cat, i) : null; })}
              </div>) 
            : null }
          <div id="movie-reviews">
            <h2>View Reviews by Category: </h2>
            <FormControl label="View by Category">
              <select name="category" onChange={this.handleCat}>
                {categoriesAll.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
              </select>
            </FormControl>
            { reviews.length
              ? (
                <div id="movie-reviews-container">
                  {reviews.map((rev, i) => <ReviewItem key={i} review={rev} type='view' />)}
                </div>) 
              : null }
          </div>
        </section>
        
      </section>
    );
  }
}

export default withRouter(connect(
  state => ({ 
    movie: getMovie(state),
    reviews: getReviewsByMovie(state),
    user: getUser(state),
  }),
  { loadDetail, loadReviewsByMovie, addToWatchList }
)(MovieDetail));
