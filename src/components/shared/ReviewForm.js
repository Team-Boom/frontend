import React, { Component } from 'react';
import { categories, categoryBlurbs } from '../shared/constants';
import FormControl from './FormControl';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { newReview, updateReview, loadReview, removeReview } from '../reviews/actions';
import { getReview } from '../reviews/reducers';
import { getMovie } from '../movies/reducers';
import { getUser } from '../profile/reducers';
import { loadDetail } from '../movies/actions';
import checkmark from '../../assets/icons/checkmark.png';
import trashcan from '../../assets/icons/trashcan.png';
import Tickets from './Tickets';

class ReviewForm extends Component {

  static propTypes = {
    movie: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    newReview: PropTypes.func.isRequired,
    loadReview: PropTypes.func.isRequired,
    updateReview: PropTypes.func.isRequired,
    removeReview: PropTypes.func.isRequired,
    loadDetail: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    review: PropTypes.object,
  };

  state = {
    userName: null,
    category: 'Cinematography',
    rating: null,
    text: '',
  }

  componentDidMount = () => {
    const path = this.props.history.location.pathname.split('/');
    const type = path[1] === 'reviews' ? 'edit' : 'view';
    this.setState({ type: type });

    const id = path[2];

    if(type === 'edit') this.props.loadReview(id);
    if(type === 'view') this.props.movie.Title ? null : this.props.loadDetail(id);

    this.setState({ userName: this.props.user.name });
  }

  componentDidUpdate = prevProps  => {
    if(this.props.review.text){
      if(prevProps.review.text) return;
      const old = this.props.review;
      this.setState({ category: old.category, rating: old.rating, text: old.text });
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleRating = rating => {
    this.setState({ rating: rating });
  }

  handleSubmit = e => { 
    e.preventDefault();
    this.state.rating === null ? alert('Please add a rating to your review!') : this.handleSave();
  };

  handleDelete = () => {
    this.state.type === 'edit' ? this.props.removeReview(this.props.review._id) : null;
    this.props.history.goBack();
  }

  handleSave = () => {
    const movie = {
      movieId: this.props.movie.imdbID,
      poster: this.props.movie.Poster,
      title: this.props.movie.Title,
      description: this.props.movie.Plot,
    };

    const review = {
      userName: this.state.userName,
      category: this.state.category,
      rating: this.state.rating,
      text: this.state.text,
    };
    this.state.type === 'edit' ? updateReview(review) : newReview(review, this.props.user, movie);
    this.props.history.goBack();
  }

  render() {
    const { movie } = this.props;
    const { category, text, rating } = this.state;

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
            <select name="category" value={category} onChange={this.handleChange}>
              {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
          </FormControl>
          <Tickets type='edit' current={rating} onRate={this.handleRating}/>
          <FormControl label="write a review">
            <input type="text" maxLength="1000" name="text" value={text} onChange={this.handleChange} required/>
          </FormControl>
          <FormControl label="save review" hide={true}>
            <button type="save"><img className="icon clickable" src={checkmark}/></button> 
          </FormControl>
          <FormControl label="delete review" hide={true}>
            <button type="button" onClick={this.handleDelete}><img className="icon clickable" src={trashcan}/></button>
          </FormControl>
        </fieldset>
      </form>
    );
  }
}

export default withRouter(connect(
  state => ({ 
    movie: getMovie(state),
    user: getUser(state),
    review: getReview(state),
  }),
  { newReview, updateReview, loadDetail, loadReview, removeReview }
)(ReviewForm));