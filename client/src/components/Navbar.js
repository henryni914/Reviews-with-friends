import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
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
  const [redirect, setRedirect] = useState(null);
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const stateUser = useSelector(state => state.user)

  function handleInputChange(event) {
    setSearch(event.target.value);
  };

  function handleFormSubmit() {
    if (search.length < 1) {
      return;
    }
    // Add feature to sort by all, films, tv and add an if check to see what user selected
    // ex. /search/all/q= ex. /search/films/q= ex. /search/tv/q= 
    API.searchMovies(search)
      .then(res => {
        dispatch(updateSearch(search, res.data.results))
        setRedirect("/results/q=" + search);
        setSearch("");
      })
      .catch(err => console.log(err));
  };

  //  Checks to see if user exists in DB. If not, add the user to the DB
  function userCheck() {
    // insert API call to find if the email exists in DB
    API.findAll().then(res => console.log('db res: ' + JSON.stringify(res.data)))
  }
  userCheck()


  useEffect(() => {
    if (stateUser.email !== "") {
      return;
    }
    if (user) {
      dispatch(setUser(user))
      // userCheck(stateUser.email)
        // .then(res => console.log('res.data: ' + res.data))
      // .then(userCheck(stateUser.email)
      // .then(res => console.log('res.data: ' + res.data))
      // )
      // sessionStorage.setItem("user", user) need to grab user from DB and store as obj
    }
  }, [user]);
  // console.log('user: ' + JSON.stringify(stateUser))
  return (
    <>
      <Menu inverted borderless stackable>
        <Menu.Item
          as={Link}
          name='home'
          to='/'
        />
        <Menu.Item
          as={Link}
          name='browse'
          to='/browse'
        />

        <Menu.Item
          as={Link}
          name='profile'
          to='/profile'
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
      {redirect && (
        <Redirect to={redirect} />
      )}
    </>
  )
}


