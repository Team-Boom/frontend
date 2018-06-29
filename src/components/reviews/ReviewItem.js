import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tickets from '../shared/Tickets';
import editIcon from '../../assets/icons/write-review.png';
import styles from '../shared/cardInner.scss';
class ReviewItem extends PureComponent {

  static propTypes = {
    review: PropTypes.object.isRequired,
    canEdit: PropTypes.bool,
  };

  render() {
    const { review, canEdit } = this.props;
    const editLink = `/reviews/${review._id}/edit`;
    const detailLink = `/movies?id=${review.movieId}`;

    return (
      <div className={styles.cardInner}>
        {canEdit ? (
          <Link to={detailLink}>
            <img className="poster" src={review.poster}/>
            <h2> {review.title} </h2>
          </Link>
        ) : null }
        <h3>{review.category}</h3>
        <Tickets type='view' current={review.rating}/>
        <p>"{review.text}"</p>
        {canEdit ? (<Link to={editLink} type='edit'> <img src={editIcon}/> </Link>) : null }
        {!canEdit ? (<q className="review-signed">-{review.userName}</q> ): null }
      </div>
    );
  }
}

export default ReviewItem;