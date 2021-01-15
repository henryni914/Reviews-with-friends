import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Input, Menu, Form } from 'semantic-ui-react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import { useAuth0 } from '../utils/auth0context';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../actions/user';
import { updateSearch } from '../actions/movies'
import API from '../utils/API';

export default function Nav() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { user } = useAuth0();
  // console.log('from auth0', user);
  const dispatch = useDispatch();
  const stateUser = useSelector(state => state.movies)


  //   // API.searchMovies(searchRef.current.value)
  //   // .then(res => console.log('res', res))
  //   // .catch(err => console.log('err', err));
  // }

  function handleInputChange(event) {
    // console.log('event', event.target.value)
    setSearch(event.target.value);
  }

  function handleFormSubmit() {
    if (search.length < 1) {
      return;
    }
    API.searchMovies(search)
      .then(res => {
        dispatch(updateSearch(search, res.data.results))
        setResults(res.data.results);
        <Redirect to="/results" />
        setSearch("");
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
      // console.log('user set');
    }
  }, [results]);

  return (
    <>
      <Menu inverted borderless>
        <Menu.Item
          name='home'
          href="/"
        />
        <Menu.Item
          name='movies'
          href="/search"
        />
        <Menu.Item
          name='profile'
        />
        <Menu.Menu position='right'>

          {/* need to add a search function for user input */}
          <Menu.Item>
            <Form onSubmit={handleFormSubmit}>
              <Input icon='search' placeholder='Search...' value={search} onChange={handleInputChange} />
            </Form>
          </Menu.Item>
          <Menu.Item>
            {!(user) && (
              <LoginButton />
            )}
            {(user) && (
              <LogoutButton />
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  )
}


