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

const ReviewForm = () => (

  <Route render={({ props, location, history }) =>  (

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

  )}/>
);

ReviewForm.propTypes = {
  type: PropTypes.string.isRequired,
  movie: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  newReview: PropTypes.func.isRequired,
  updateReview: PropTypes.func.isRequired,
  loadDetail: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  review: PropTypes.object,
    
};

export default connect(
  state => ({ 
    movie: getMovie(state),
    user: getUser(state),
  }),
  { newReview, updateReview, loadDetail }
)(ReviewForm);