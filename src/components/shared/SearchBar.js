import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuery } from '../nav/reducers';
import { withRouter } from 'react-router';
import styles from './SearchBar.scss';

class SearchBar extends PureComponent {

  static propTypes = {
    search: PropTypes.string,
    history: PropTypes.object.isRequired,
  };

  handleChange = ({ target }) => {
    this.setState({ search: target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.history.push(`/search?q=${this.state.search}`);
  }

  render() {
    const { search } = this.props;

    return (
      <form className={styles.search} onSubmit={e => this.handleSearch(e)}>
        <input 
          type="search"
          id="searchBar" 
          placeholder="Search here..." 
          value={search} 
          onChange={this.handleChange} 
          required
        />
        <button type="submit" id="searchButton"> Search </button>
      </form>
    );
  }
}

export default withRouter(connect(
  state => ({ search: getQuery(state) }),
  null
)(SearchBar));

