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
import trashcan from '../../assets/icons/trash.png';
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
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
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
    const type = path[1] === 'reviews' ? 'edit' : 'view';
    this.setState({ type: type });

    const id = path[2];

    if(type === 'edit') this.props.loadReview(id);
    if(type === 'view') this.props.movie.Title ? null : this.props.loadDetail(id);

    this.setState({ userName: this.props.user.name });
  }

  componentDidUpdate = prevProps  => {
    if(!prevProps.review){
      if(this.props.review == null) return;
      const old = this.props.review;
      this.setState({ category: old.category, rating: old.rating, text: old.text });
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleDelete = () => {
    this.props.removeReview(this.props.review._id);
    this.props.history.goBack();
  }

  handleRating = rating => {
    this.setState({ rating: rating });
  }

  handleSubmit = (e) => {
    e.preventDefault();

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
    this.state.type === 'edit' ? updateReview(review) : newReview(review, this.props.user._id, movie);
    this.props.history.goBack();
  }

  render() {
    console.log(this.props.history);
    const { movie } = this.props;
    const { category, text } = this.state;

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
          <button type="submit"><img src={checkmark}/></button> 
          <button type="delete" onClick={this.handleDelete}><img src={trashcan}/></button>
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