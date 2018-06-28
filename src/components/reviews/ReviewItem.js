import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tickets from '../shared/Tickets';
import editIcon from '../../assets/icons/write-review.png';
class ReviewItem extends PureComponent {

  static propTypes = {
    review: PropTypes.object.isRequired,
    canEdit: PropTypes.bool,
  };

  render() {
    const { review, canEdit } = this.props;
    const editLink = `/reviews/${review._id}/edit`;

    return (
      <div className="review-card">
        {canEdit ? (<h2> {review.title} </h2>) : null }
        <h3>{review.category}</h3>
        <Tickets type='view' current={review.rating}/>
        <p>{review.text}</p>
        {canEdit ? (<Link to={editLink} type='edit'> <img src={editIcon}/> </Link>) : null }
        <p className="review-signed">-{review.userName}</p>
      </div>
    );
  }
}

export default ReviewItem;