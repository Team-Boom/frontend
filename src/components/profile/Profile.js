import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, getUserAvg } from './reducers';
import { loadUserAvg } from './actions';
import { Link } from 'react-router-dom';
import { loadReviewsByUser } from '../reviews/actions';
import { getReviewsByUser } from '../reviews/reducers';
import { logout } from '../profile/actions';
import ReviewItem from '../reviews/ReviewItem';
import Tickets from '../shared/Tickets';

class Profile extends Component {

    static propTypes = {
      user: PropTypes.object.isRequired,
      loadUserAvg: PropTypes.func.isRequired,
      loadReviewsByUser: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      reviews: PropTypes.array,
      avg: PropTypes.any
    };

    componentDidMount() {
      this.props.loadUserAvg(this.props.user._id);
      this.props.loadReviewsByUser(this.props.user._id);
    }

    handleLogout = () => {
      this.props.logout();
    }

    render() {
      const { user, avg, reviews } = this.props;

      return (
        <section className="profile-page">
          <h2>Hey, {user.name}!</h2>

          <h3> You joined DeepFocus on {user.date} </h3>
          {avg ? (<h3>Your average review: <Tickets type="view" current={avg.avgRating} /></h3>) : null }

          <div id='links'>
            {
              user
                ? <Link to="/" onClick={this.handleLogout}>Logout</Link>
                : <Link to="/auth">Login</Link>
            } 
          </div>
          <div id="profile-reviews">

            {!reviews ? 'You haven\'t reviewed any movies yet!' : reviews.map((rev, i) => <ReviewItem key={i} review={rev} canEdit={true} />) }

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
  { loadUserAvg, loadReviewsByUser, logout }
)(Profile);
