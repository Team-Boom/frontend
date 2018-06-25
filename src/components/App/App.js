import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import connect from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Auth from '../auth/Auth';
import Home from '../home/Home';
import Nav from '../nav/Nav';
import Browse from '../browse/Browse';
import Movies from '../movie/Movies';
import Profile from '../profile/Profile';
import WatchList from '../profile/Watchlist';
import Reviews from '../review/Reviews';

class App extends PureComponent {
  
  render() {

    return (
      <Router>
        <main>
          <Nav/>
          <div> 
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/auth" component={Auth}/>
              <Redirect to="/"/>
            </Switch>
          </div>
        </main>
      </Router>
    );
  }
}

export default App;