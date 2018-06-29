import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuery } from '../nav/reducers';
import { withRouter } from 'react-router';
import styles from './SearchBar.scss';
import icon from '../../assets/icons/search.png';

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
          placeholder="Search movies here..." 
          value={search} 
          onChange={this.handleChange} 
          required
        />
        <button type="submit" id="searchButton">
          <img src={icon} />
        </button>
      </form>
    );
  }
}

export default withRouter(connect(
  state => ({ search: getQuery(state) }),
  null
)(SearchBar));

