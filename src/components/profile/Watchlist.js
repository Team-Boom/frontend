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
      watchList: PropTypes.array
    };

    componentDidMount() {
      this.props.loadWatchlist(this.props.user._id);
    }

    componentDidUpdate(prevProps) {
      if(prevProps.user !== this.props.user){
        this.props.loadWatchlist(this.props.user._id);
      }
    }

    render() {
      const { watchList } = this.props;

      return (
        <section id="watchlist-page">
          {watchList.length
              ? watchList.map((movie, i)=> <MovieCard key={i} movie={movie} watchRemove={true} reviewType="add"/>)
              : <h3>Add some movies to your watchlist!</h3>
          }
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