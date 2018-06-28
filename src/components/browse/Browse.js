import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getSorted } from './reducers';
import { loadSort, clearSort } from './actions';
import { categories, categoryBlurbs } from '../shared/constants';
import MovieCard from '../shared/MovieCard';
import SearchBar from '../shared/SearchBar';
import FormControl from '../shared/FormControl';
import queryString from 'query-string';

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

  componentDidMount() {
    const query = this.props.location.search;
    if(!query) return null;

    const { cat, p } = queryString.parse(query);
    this.setState({ category: cat, page: p }, () => {
      this.props.loadSort(cat, p);
    });
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
        <div id="search">
          <SearchBar/>
        </div>
        <div id="browse-category">
          <FormControl label="select a category">
            <select name="category" onChange={this.handleCat}>
              {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
          </FormControl>
          {category ? categoryBlurbs[category] : null }
        </div>
        {sorted ? sorted.map((movie, i) => <MovieCard key={i} movie={movie} ticRating={movie.rating} />) : null}
      </section>

    );
  }
}

export default withRouter(connect(
  state => ({ sorted: getSorted(state) }),
  { loadSort, clearSort }
)(Browse));

