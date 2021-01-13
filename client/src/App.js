import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import 'semantic-ui-css/semantic.min.css';
import { Auth0Provider } from './utils/auth0context';

export default function App() {

  return (
    <Router>
      <Auth0Provider>
        <div className="App">
          <Route exact path="/" component={Home} />
        </div>
      </Auth0Provider>
    </Router>

  );
}
