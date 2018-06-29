import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getSorted } from './reducers';
import { loadSort, clearSort } from './actions';
import { categories, categoryBlurbs } from '../shared/constants';
import MovieCard from '../shared/MovieCard';
import FormControl from '../shared/FormControl';
import queryString from 'query-string';
import styles from './Browse.scss';

class Browse extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    loadSort: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    sorted: PropTypes.array,
  };

  state = {
    category: null,
    page: 1,
  }

  browseByQuery() {
    const query = this.props.location.search;
    if(!query) return null;

    const { cat, p } = queryString.parse(query);
    this.setState({ category: cat, page: p }, () => {
      this.props.loadSort(cat, p);
    });
  }

  componentDidMount() {
    this.browseByQuery();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.search === this.props.location.search) return;
    this.browseByQuery();
  }

  handleCat = ({ target }) => {
    this.setState({ category: target.value }, () => {
      this.props.history.push(`/browse?cat=${this.state.category}&p=${this.state.page}`);
    });
  }

  render() {
    const { category } = this.state;
    const { sorted } = this.props;
   
    return (
      <section className="browse-page">
        <div className={styles.browse}>
          <FormControl label="select a category">
            <select name="category" onChange={this.handleCat}>
              {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
          </FormControl>
          {category ? categoryBlurbs[category] : null }
        </div>
        {sorted.length ? sorted.map((movie, i) => <MovieCard key={i} movie={movie} ticRating={movie.avgRating} poster={true} />) : null}
      </section>

    );
  }
}

export default withRouter(connect(
  state => ({ sorted: getSorted(state) }),
  { loadSort, clearSort }
)(Browse));

