import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { tryLoadUser } from '../profile/actions';
import { getCheckedAuth } from '../profile/reducers';
import Auth from '../profile/Auth';
import PrivateRoute from './PrivateRoutes';
import Landing from '../home/Landing';
import Home from '../home/Home';
import Nav from '../nav/Nav';
import Browse from '../browse/Browse';
import Movies from '../movies/Movies';
import Profile from '../profile/Profile';
import WatchList from '../profile/Watchlist';
import Reviews from '../reviews/Reviews';

class App extends PureComponent {

  static propTypes = {
    tryLoadUser: PropTypes.func.isRequired,
    checkedAuth: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.tryLoadUser();
  }

  render() {

    const { checkedAuth } = this.props;

    return (
      <Router>
        <main>
          <Nav/>
          <div>
            { checkedAuth &&
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/home" component={Home}/>
              <Route path="/auth" component={Auth}/>
              <Route path="/browse" component={Browse}/>
              <Route path="/movies" component={Movies}/>
              <Route path="/reviews" component={Reviews}/>
              <PrivateRoute path="/profile" component={Profile}/>
              <PrivateRoute path="/watchlist" component={WatchList}/>
              <Redirect to="/home"/>
            </Switch>
            }
          </div>
        </main>
      </Router>
    );
  }
}

export default connect(
  state => ({ checkedAuth: getCheckedAuth(state) }),
  { tryLoadUser }
)(App);
