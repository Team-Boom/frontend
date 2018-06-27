import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { loadDetail } from '../movies/actions';
import { getMovie } from '../movies/reducers';
import { loadReviewsByMovie } from '../reviews/actions';
import { getReviewsByMovie } from '../reviews/reducers';
import { categoriesAll } from '../shared/constants';
import FormControl from '../shared/FormControl';
import queryString from 'query-string';
import ReviewItem from '../reviews/ReviewItem';

class MovieDetail extends PureComponent {

  static propTypes = {
    movie: PropTypes.object,
    location: PropTypes.object.isRequired,
    loadDetail: PropTypes.func.isRequired,
    loadReviewsByMovie: PropTypes.func.isRequired,
    reviews: PropTypes.array,
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

  render() {
    const { movie, reviews } = this.props;
    const { id } = this.state;
    const reviewLink = `movies/${id}/write`;
    let reviewsExist = reviews ? true : false;

    if(!movie) return null;
    return (
      <section className="movie-page">
        <div id="movie-page-top">
          <img src={movie.Poster}/>
          <h2>{movie.Title}</h2>
        </div>
        <div id="movie-page-content">
          <h3>Released: {movie.Released}</h3>
          <h3>Director: {movie.Director}</h3>
          <h3>Cast: {movie.Actors}</h3>
          <p> {movie.Plot}</p>
          {/* {movie.Ratings ? (<div className="ex-ratings">
            <span className="ex-rating"> IMDB: {movie.Ratings[0].Value || 'N/A' }</span>
            <span className="ex-rating"> Rotten: {movie.Ratings[1].Value || 'N/A' }</span>
            <span className="ex-rating"> Meta: {movie.Ratings[2].Value || 'N/A' }</span>
          </div>) : null } */}
        </div>
        <div id="movie-page-reviews">
          {/* averages star ratings here */}
          <h2>View Reviews by Category: </h2>
          <Link to={reviewLink}> Write a review! </Link>
          <div id="reviews-category">
            <FormControl label="View by Category">
              <select name="category" onChange={this.handleCat}>
                {categoriesAll.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
              </select>
            </FormControl>
          </div>
          <div id="reviews-container">
            {reviewsExist ? reviews.map((rev, i) => <ReviewItem key={i} review={rev} type='view' />) : <p> There aren't any reviews for this movie, yet!  Go ahead and add your own! </p>}
          </div>

        </div>

      </section>
    );
  }
}

export default withRouter(connect(
  state => ({ 
    movie: getMovie(state),
    reviews: getReviewsByMovie(state)
  }),
  { loadDetail, loadReviewsByMovie }
)(MovieDetail));

