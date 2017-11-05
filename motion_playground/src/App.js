import React, { Component } from 'react';
import logo from './logo.svg';
import MotionTest from './MotionTest.js';
import Control from './Control.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-heading">Motion Playground</div>
        <Control id="control-container"></Control>
        <MotionTest id="motion-container"></MotionTest>
      </div>
    );
  }
}

export default App;
