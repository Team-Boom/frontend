import React, { Component } from 'react';
import { categories, categoryBlurbs } from '../shared/constants';
import FormControl from './FormControl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newReview, updateReview } from '../reviews/actions';
import { getMovie } from '../movies/reducers';
import { getUser } from '../profile/reducers';

class ReviewForm extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    movie: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    newReview: PropTypes.func.isRequired,
    updateReview: PropTypes.func.isRequired,
    review: PropTypes.object,
  };

  state = {
    review: {
      category: null,
      rating: null,
      text: '',
    }
  }

  componentDidMount = () => {
    if(this.props.type === 'update'){
      const oldReview = this.props.review;
      const review = {
        category: oldReview.category,
        rating: oldReview.rating,
        text: oldReview.text
      };
      this.setState({ review: review });
    }
  }

  handleChange = ({ target }) => {
    const review = this.props.review;
    review[target.name] = target.value;
    this.setState({ review: review });
  }

  handleSubmit = () => {
    const movie = {
      _id: this.props.movie._id,
      poster: this.props.movie.poster,
      title: this.props.movie.title,
      description: this.props.movie.description,
    };
    this.props.type === 'update' ? updateReview(this.state.review) : newReview(this.state.review, movie, this.props.user._id);
  }

  render() {
    const { movie } = this.props;
    const { review } = this.state;
    const { category, rating, text } = review;

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
          {/* insert rating component */}
          <FormControl label="write a review">
            <input type="text" maxLength="1000" name="text" value={text} onChange={this.handleChange}/>
          </FormControl>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    );
  }
}

export default connect(
  state => ({ 
    movie: getMovie(state),
    user: getUser(state),
  }),
  { newReview, updateReview }
)(ReviewForm);