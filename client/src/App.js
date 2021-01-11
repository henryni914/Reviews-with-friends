import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <h1>Hello</h1> */}
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
