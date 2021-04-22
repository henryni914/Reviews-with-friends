import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import SearchPage from './pages/MovieSearch';
import MoviePage from './pages/MoviePage';
import Profile from './pages/Profile';
import Browse from './pages/Browse';
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
          <Route path="/film/id=:filmId" component={MoviePage} />
          <Route path="/profile" component={Profile} />
          <Route path="/browse" component={Browse} />
          <section id='footer'>
            <Footer />
          </section>
        </div>
      </Auth0Provider>
    </Router>

  );
}
