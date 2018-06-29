import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../profile/reducers';
import PropTypes from 'prop-types';
import { loadTop10s } from '../movies/actions';
import { getTop10s } from '../movies/reducers';
import Carousel from './Carousel';
class Home extends PureComponent {

  static propTypes = {
    loadTop10s: PropTypes.func.isRequired,
    top10s: PropTypes.object,
  };

  state = {
    test: null,
  }

  componentDidMount() {
    this.props.loadTop10s();
    // const testMovie = {
    //   poster: 'https://ia.media-imdb.com/images/M/MV5BMTI5NTE2OTQtN2YyZi00OTI5LTljMmEtMDZlMTk0MzNmZmY5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    //   title: 'Oliver',
    // };
    // this.setState({ test: [testMovie, testMovie, testMovie, testMovie, testMovie, testMovie, testMovie, testMovie, testMovie, testMovie] });
  }
  
  render() {
    const { top10s } = this.props;
    const top10Loaded = Object.keys(top10s).length ? true : false;
    
    return (
      <section className="home-page">
        <h1> Deep Focus </h1>

        {top10Loaded && <Carousel movies={top10s.cinematography} />}


      </section>
    );
  }
}

export default connect(
  state => ({ 
    top10s: getTop10s(state),
  }),
  { loadTop10s },
)(Home);

