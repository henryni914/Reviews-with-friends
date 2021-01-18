import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import SearchPage from './pages/MovieSearch';
import MoviePage from './pages/MoviePage';
import Navbar from './components/Navbar';
import 'semantic-ui-css/semantic.min.css';
import { Auth0Provider } from './utils/auth0context';
import Nav from './components/Navbar';
import Footer from './components/Footer';


export default function App() {

  return (
    <Router>
      <Auth0Provider>
        <div className="App">
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/results/q=:query" component={SearchPage} />
          {/* add movie component  */}
          <Route path="/film/id=:filmId" component={MoviePage} />
          {/* Need to make content take up 100vh or something to fill up
           empty space or else footer will rise */}
          <section id='footer'>
            <Footer />
          </section>
        </div>
      </Auth0Provider>
    </Router>

  );
}
