import React, { Component } from 'react';
import './App.css';
import Home from './components/pages/home';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './redux/store';
import {Provider} from 'react-redux';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Home}/>

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
