import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
class ReviewItem extends PureComponent {

  static propTypes = {
    review: PropTypes.object.isRequired,
    type: PropTypes.string, //'view' or 'edit'
  };

  render() {
    const { review, type } = this.props;

    return (
      <div className="review-card">
        {type === 'edit' ? (<h2> {review.title} </h2>) : null }
        <h3>{review.category}</h3>
        {/* add rating */}
        <p>{review.text}</p>
        {type === 'edit' ? 'edit button here' : null }
        <p className="review-signed">-{review.userName}</p>
      </div>
    );
  }
}

export default ReviewItem;