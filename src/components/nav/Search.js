import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newSearch } from '../nav/actions';
import { withRouter } from 'react-router';
import { getSResults, getSState, getSQuery } from '../nav/reducers';
import MovieCard from '../shared/MovieCard';
import queryString from 'query-string';
import styles from '../shared/cardGrid.scss';
import Spinner from 'react-spinkit';

class Search extends PureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired,
    newSearch: PropTypes.func.isRequired,
    query: PropTypes.string,
    results: PropTypes.array,
    loading: PropTypes.any,
  };

  componentDidMount() {
    this.checkSearch();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location !== this.props.location){
      this.checkSearch();
    }
  }

  checkSearch() {
    const string = this.props.location.search;
    const { q } = queryString.parse(string);
    this.props.newSearch(q);
  }


  render() {
    const { results, loading, query } = this.props;

    if(loading) return (
      <section id="search-page" className="center">
        <Spinner name="cube-grid" />
      </section>
    );

    if(!query && !loading) return (
      <section id="search-page" className="center">
        <h2>Please search for a movie in the search bar!</h2>
      </section>
    );

    return (
      <section id="search-page" className={styles.cardGrid}>
        {results.map((movie, i) => <MovieCard key={i} movie={movie} watchAdd={true}/>)}
      </section>
    );
  }
}

export default withRouter(connect(
  state => ({ 
    results: getSResults(state),
    loading: getSState(state),
    query: getSQuery(state),
  }),
  { newSearch }
)(Search));

