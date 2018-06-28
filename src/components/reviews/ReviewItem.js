import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tickets from '../shared/Tickets';
class ReviewItem extends PureComponent {

  static propTypes = {
    review: PropTypes.object.isRequired,
    type: PropTypes.string, //'view' or 'edit'
  };

  render() {
    const { review, type } = this.props;
    const editLink = `/movies/${review.movieId}/write`;

    return (
      <div className="review-card">
        {type === 'edit' ? (<h2> {review.title} </h2>) : null }
        <h3>{review.category}</h3>
        <Tickets type='view' current={review.rating}/>
        <p>{review.text}</p>
        {type === 'edit' ? (<Link to={editLink} type='edit'> Edit </Link>) : null }
        {type === 'edit' ? 'delete button here' : null }
        <p className="review-signed">-{review.userName}</p>
      </div>
    );
  }
}

export default ReviewItem;