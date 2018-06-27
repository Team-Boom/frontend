import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newSearch } from '../nav/actions';
import { withRouter } from 'react-router';
import { getResults } from '../nav/reducers';
import MovieCard from '../shared/MovieCard';
class Search extends PureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired,
    newSearch: PropTypes.func.isRequired,
    results: PropTypes.any
  };

  componentDidMount() {
    this.props.newSearch(this.props.location);
  }


  render() {
    const { results } = this.props;
    if(!results.Search) return null;
    return (
      <section className="search-page">
        {results.Search.map((movie, i) => <MovieCard key={i} movie={movie} reviewed={true}/>)}
      </section>
    );
  }
}

export default withRouter(connect(
  state => ({ results: getResults(state) }),
  { newSearch }
)(Search));

