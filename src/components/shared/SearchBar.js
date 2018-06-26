import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from './FormControl';
import { connect } from 'react-redux';
import { getQuery } from '../nav/reducers';
import { newSearch } from '../nav/actions';

class SearchBar extends PureComponent {

  static propTypes = {
    search: PropTypes.string,
    newSearch: PropTypes.func.isRequired,
  };

  handleChange = ({ target }) => {
    this.setState({ search: target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.newSearch(this.state.search);
  }

  render() {
    const { search } = this.props;

    return (
      <form className="search-bar" onSubmit={e => this.handleSearch(e)}>
        <FormControl label="search">
          <input type="search" value={search} onChange={this.handleChange}/>
        </FormControl> 
        <button type="submit"> Search </button>
      </form>
    );
  }
}

export default connect(
  state => ({ search: getQuery(state) }),
  { newSearch }
)(SearchBar);