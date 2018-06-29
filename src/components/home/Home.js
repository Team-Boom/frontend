import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadTop10s } from '../movies/actions';
import { getTop10s } from '../movies/reducers';
import Carousel from './Carousel';
import styles from './Home.scss';

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
  }
  
  render() {
    const { top10s } = this.props;
    const categories = Object.keys(top10s);
    const top10Loaded = categories.length ? true : false;

    return (
      <section id="home" className={styles.home}>
        <div id="carousel-container">
          {top10Loaded && categories.map((cat, i) => <Carousel key={i} movies={top10s[cat]} category={cat}/>)}
        </div>
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

