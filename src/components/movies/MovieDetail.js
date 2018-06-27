import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { loadDetail } from '../movies/actions';
import { getMovie } from '../movies/reducers';
import queryString from 'query-string';

class MovieDetail extends PureComponent {

  static propTypes = {
    movie: PropTypes.object,
    location: PropTypes.object.isRequired,
    loadDetail: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const search = this.props.location.search;
    const { id } = queryString.parse(search);
    this.props.loadDetail(id);
  }


  render() {
    const { movie } = this.props;
    if(!movie) return null;
    return (
      <div>
        <img src={movie.Poster}/>
        <h2>{movie.Title}</h2>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({ movie: getMovie(state) }),
  { loadDetail }
)(MovieDetail));

