import React, { Component } from 'react';
import Mood from './Mood.js'
import Comment from './Comment.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Mood />
        <Comment />
      </div>
          );
  }
}

export default App;
