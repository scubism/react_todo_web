import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class App extends Component {
  render() {
    return (
      <div>
        <div className="app-title">Hello React TODO Web</div>
        <Link to="/todos">Try Todo Sample</Link>
      </div>
    );
  }
}

export default App;
