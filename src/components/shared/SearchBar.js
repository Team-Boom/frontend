import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from './FormControl';
import { connect } from 'react-redux';
import { getQuery } from '../nav/reducers';
import { withRouter } from 'react-router';

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
    // this.props.newSearch(this.state.search);
    this.props.history.push(`/search?q=${this.state.search}`);
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

export default withRouter(connect(
  state => ({ search: getQuery(state) }),
  null
)(SearchBar));

