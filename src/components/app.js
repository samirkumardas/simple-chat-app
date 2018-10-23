import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './dashboard';
import Login from './login';
import Signup from './signup';

const App = ( {store} ) => (
    <Provider store = {store}>
       <Router>
          <Switch>
             <Route exact path="/" component={Login} />
             <Route path="/signup" component={Signup} />
             <Route path="/messages/:key?" component={Dashboard} />
             <Route component={Login}/>
          </Switch>
       </Router>
    </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;