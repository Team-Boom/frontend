import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newSearch } from '../nav/actions';
import { withRouter } from 'react-router';
import { getResults } from '../nav/reducers';
import MovieCard from '../shared/MovieCard';
import queryString from 'query-string';
import styles from '../shared/cardGrid.scss';
class Search extends PureComponent {

  static propTypes = {
    location: PropTypes.object.isRequired,
    newSearch: PropTypes.func.isRequired,
    results: PropTypes.any
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
    const { results } = this.props;
    if(!results.Search) return null;
    return (
      <section id="search-page" className={styles.cardGrid}>
        {results.Search.map((movie, i) => <MovieCard key={i} movie={movie} watchAdd={true}/>)}
      </section>
    );
  }
}

export default withRouter(connect(
  state => ({ results: getResults(state) }),
  { newSearch }
)(Search));

