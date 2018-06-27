import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, getUserAvg } from './reducers';
import { loadUserAvg } from './actions';
import { loadReviewsByUser } from '../reviews/actions';
import { getReviewsByUser } from '../reviews/reducers';
import ReviewItem from '../reviews/ReviewItem';

class Profile extends Component {

    static propTypes = {
      user: PropTypes.object.isRequired,
      loadUserAvg: PropTypes.func.isRequired,
      loadReviewsByUser: PropTypes.func.isRequired,
      reviews: PropTypes.array,
      avg: PropTypes.any
    };

    componentDidMount() {
      this.props.loadUserAvg(this.props.user._id);
      this.props.loadReviewsByUser(this.props.user._id);
    }

    render() {
      const { user, avg, reviews } = this.props;
      console.log('avg', avg);
      console.log('user', user);


      return (
        <section className="profile-page">
          <h2>Hey, {user.name}!</h2>

          <h3> You joined DeepFocus on {user.date} </h3>
          {avg ? (<h3>Your average review gives {avg.avgRating} stars </h3>) : null }

          <div id="profile-reviews">

            {!reviews ? 'You haven\'t reviewed any movies yet!' : reviews.map((rev, i) => <ReviewItem key={i} review={rev} type='edit' />) }

          </div>
        </section>
      );
    }
}

export default connect(
  state => ({
    user: getUser(state),
    avg: getUserAvg(state),
    reviews: getReviewsByUser(state),
  }),
  { loadUserAvg, loadReviewsByUser }
)(Profile);