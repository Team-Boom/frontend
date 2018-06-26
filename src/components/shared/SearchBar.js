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
    this.props.newSearch(this.props.search);
  }

  render() {
    const { search } = this.props;

    return (
      <div className="search-bar">
        <FormControl label="search" onSubmit={e => this.handleSearch(e)}>
          <input type="search" value={search} onChange={this.handleChange}/>
        </FormControl> 
      </div>
    );
  }
}

export default connect(
  state => ({ search: getQuery(state) }),
  { newSearch }
)(SearchBar);