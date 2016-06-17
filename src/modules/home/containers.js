import React from "react";

if (process.env.BROWSER) {
  require("./home.css");
}



export default class HomePage extends React.Component {
  render() {
    return (
      <div className="home">
        <h1>Home Page</h1>
        <p className="welcomeText">Thanks for joining!</p>
      </div>
    );
  }
}
