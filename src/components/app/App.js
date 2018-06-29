import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './Landing';
import Site from './Site';
import AppWrapper from '../app/AppWrapper';

export default class App extends PureComponent {

  render() {

    return (
      <AppWrapper>
        <div id="page-container">
          <Router>
            <main>
              <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path="/" component={Site}/>
              </Switch>
            </main>
          </Router>
        </div>
      </AppWrapper>

    );
  }
}
