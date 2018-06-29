import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../profile/reducers';
import PropTypes from 'prop-types';
import { loadTop10s } from '../movies/actions';
import { getTop10s } from '../movies/reducers';
import Carousel from './Carousel';
class Home extends PureComponent {

  static propTypes = {
    user: PropTypes.object,
    loadTop10s: PropTypes.func.isRequired,
    top10s: PropTypes.object,
  };

  state = {
    test: null,
  }

  componentDidMount() {
    this.props.loadTop10s();
    const testMovie = {
      poster: 'https://ia.media-imdb.com/images/M/MV5BMTI5NTE2OTQtN2YyZi00OTI5LTljMmEtMDZlMTk0MzNmZmY5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      title: 'Oliver',
    };
    this.setState({ test: [testMovie, testMovie, testMovie, testMovie, testMovie, testMovie, testMovie, testMovie, testMovie, testMovie] });
  }
  
  render() {
    const { user } = this.props;

    return (
      <section className="home-page">
        <h1> Deep Focus </h1>
        {user && (<h3>Welcome {user.userName}</h3>)}

        {this.state.test && <Carousel movies={this.state.test} />}

      </section>
    );
  }
}

export default connect(
  state => ({ 
    user: getUser(state),
    top10s: getTop10s(state),
  }),
  { loadTop10s },
)(Home);

