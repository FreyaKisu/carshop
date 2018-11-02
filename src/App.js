import React, { Component } from "react";
import "./App.css";
import Carlist from "./components/carlist";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Car shop</h2>
        </header>
        <Carlist />
      </div>
    );
  }
}

export default App;
