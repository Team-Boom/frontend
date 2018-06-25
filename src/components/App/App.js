import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { tryLoadUser } from '../auth/actions';
import { getCheckedAuth } from '../auth/reducers';
import Auth from '../auth/Auth';
import PrivateRoute from './PrivateRoutes';
import Home from '../home/Home';
import Nav from '../nav/Nav';
import Browse from '../browse/Browse';
import Movies from '../movie/Movies';
import Profile from '../profile/Profile';
import WatchList from '../profile/Watchlist';
import Reviews from '../review/Reviews';

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
              <Route exact path="/" component={Home}/>
              <Route path="/auth" component={Auth}/>
              <Route path="/browse" component={Browse}/>
              <Route path="/movies" component={Movies}/>
              <PrivateRoute path="/profile" component={Profile}/>
              <PrivateRoute path="/watchlist" component={WatchList}/>
              <Route path="/reviews" component={Reviews}/>
              <Redirect to="/"/>
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