import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSQuery } from '../nav/reducers';
import { withRouter } from 'react-router';
import styles from './SearchBar.scss';
import icon from '../../assets/icons/search.png';

class SearchBar extends PureComponent {

  static propTypes = {
    query: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    query: '',
  }

  componentDidMount() {
    this.setState({ query: this.props.query });
  }

  handleChange = ({ target }) => {
    this.setState({ query: target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.history.push(`/search?q=${this.state.query}`);
  }

  render() {
    const { query } = this.state;

    return (
      <form className={styles.search} onSubmit={e => this.handleSearch(e)}>
        <div id="search-container">
          <input 
            type="search"
            id="searchBar" 
            placeholder="Search movies here..." 
            value={query} 
            onChange={this.handleChange} 
            required
          />
          <button type="submit" id="searchButton">
            <img src={icon} />
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(connect(
  state => ({ query: getSQuery(state) }),
  null
)(SearchBar));

