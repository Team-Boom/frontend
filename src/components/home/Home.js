import React, { PureComponent } from 'react';
import Carousel from '../shared/Carousel';
import { connect } from 'react-redux';
import { getUser } from '../profile/reducers';
import PropTypes from 'prop-types';
class Home extends PureComponent {

  static propTypes = {
    user: PropTypes.object,
  };

  
  render() {
    const { user } = this.props;

    return (
      <div>
        <h1> Deep Focus </h1>
        {user && (<h3>Welcome {user.userName}</h3>)}

      </div>
    );
  }
}

export default connect(
  state => ({ user: getUser(state) }),
  null,
)(Home);

