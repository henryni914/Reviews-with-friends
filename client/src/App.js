import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import MoviePage from './pages/MovieSearch';
import 'semantic-ui-css/semantic.min.css';
import { Auth0Provider } from './utils/auth0context';

export default function App() {

  return (
    <Router>
      <Auth0Provider>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/results" component={MoviePage}/>
        </div>
      </Auth0Provider>
    </Router>

  );
}
