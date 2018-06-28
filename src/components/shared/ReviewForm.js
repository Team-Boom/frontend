import React, { Component } from 'react';
import { categories, categoryBlurbs } from '../shared/constants';
import FormControl from './FormControl';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { newReview, updateReview } from '../reviews/actions';
import { getMovie } from '../movies/reducers';
import { getUser } from '../profile/reducers';
import { loadDetail } from '../movies/actions';
import Tickets from './Tickets';
class ReviewForm extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    movie: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    newReview: PropTypes.func.isRequired,
    updateReview: PropTypes.func.isRequired,
    loadDetail: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    review: PropTypes.object,
  };

  state = {
    userName: null,
    category: 'Cinematography',
    rating: 5,
    text: '',
  }

  componentDidMount = () => {
    const path = this.props.location.pathname.split('/');
    const id = path[2];
    this.props.movie.Title ? null : this.props.loadDetail(id);
    this.setState({ userName: this.props.user.name });

    if(this.props.type === 'update'){
      const old = this.props.review;
      this.setState({ category: old.category, rating: old.rating, text: old.text });
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleRating = rating => {
    this.setState({ rating: rating });
    console.log(this.state.rating);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const movie = {
      movieId: this.props.movie.imdbID,
      poster: this.props.movie.Poster,
      title: this.props.movie.Title,
      description: this.props.movie.Plot,
    };
    this.props.type === 'update' ? updateReview(this.state.review) : newReview(this.state, this.props.user._id, movie);
  }

  render() {
    const { movie } = this.props;
    const { category, rating, text } = this.state;

    return (
      <form className="review-form" onSubmit={this.handleSubmit}>
        <div className="review-top">
          <img src={movie.poster}/>
          <h2>Review {movie.title}</h2>
        </div>
        <div className="review-blurb">
          {category ? categoryBlurbs[category] : null}
        </div>
        <fieldset>
          <FormControl label="select a category">
            <select name="category" onChange={this.handleChange}>
              {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
          </FormControl>
          <Tickets type='edit' onRate={this.handleRating}/>
          <FormControl label="write a review">
            <input type="text" maxLength="1000" name="text" value={text} onChange={this.handleChange}/>
          </FormControl>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    );
  }
}

export default withRouter(connect(
  state => ({ 
    movie: getMovie(state),
    user: getUser(state),
  }),
  { newReview, updateReview, loadDetail }
)(ReviewForm));