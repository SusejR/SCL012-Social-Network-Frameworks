import React, { Component } from 'react';
import './css/App.css';
import Login from './views/Login.jsx';
import Home from './views/Home.jsx';
import 'materialize-css/dist/css/materialize.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  render () {
    return (
      <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/Home">
          < Home />
        </Route>
      </Switch>
    </Router>
    );
  }
  }


export default App;
