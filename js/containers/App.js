import React, { Component } from 'react'
import { connect } from 'react-redux'

import TodoContainer from './TodoContainer'

class App extends Component {
  render() {
    return (
      <div>
        <div className="app-title">Hello React TODO Web</div>
        <TodoContainer />
      </div>
    );
  }
}

export default App;
