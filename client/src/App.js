import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import MoviePage from './pages/MovieSearch';
import Navbar from './components/Navbar';
import 'semantic-ui-css/semantic.min.css';
import { Auth0Provider } from './utils/auth0context';
import Nav from './components/Navbar';

export default function App() {

  return (
    <Router>
      <Auth0Provider>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/results/q=:search" component={MoviePage}/>
          {/* add movie component  */}
          <Route path="/movie/:movieId" /> 
        </div>
      </Auth0Provider>
    </Router>

  );
}
