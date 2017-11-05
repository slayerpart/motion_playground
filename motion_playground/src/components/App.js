import React, { Component } from 'react';
import logo from '../logo.svg';
import MotionTest from '../MotionTest.js';
import Control from './Control.js';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Control id="control-container"></Control>
        <MotionTest id="motion-container"></MotionTest>
      </div>
    );
  }
}

export default App;
