import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, getWatchlist } from './reducers';
import { loadWatchlist } from './actions';
import MovieCard from '../shared/MovieCard';
class Watchlist extends Component {

    static propTypes = {
      user: PropTypes.object.isRequired,
      loadWatchlist: PropTypes.func.isRequired,
      watchlist: PropTypes.array
    };

    componentDidMount() {
      this.props.loadWatchlist(this.props.user._id);
    }

    render() {
      const { watchList } = this.props;

      return (
        <section className="watchlist-page">
          <MovieCard key={i} movie={movie} watchRemove={true} reviewType="add"/>
        </section>
      );
    }
}

export default connect(
  state => ({
    user: getUser(state),
    watchList: getWatchlist(state),
  }),
  { loadWatchlist }
)(Watchlist);