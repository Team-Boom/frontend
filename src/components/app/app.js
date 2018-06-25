import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import connect from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../home/Home';
import Auth from '../profile/Auth';
import Nav from '../nav/Nav';

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