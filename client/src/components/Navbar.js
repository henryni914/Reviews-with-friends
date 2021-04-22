import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Button, Icon, Input, Menu, Form } from 'semantic-ui-react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import { useAuth0 } from '../utils/auth0context';
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserReviews, setUserFavorites, setUserWatchlist, setNicknameAndJoin, setUserLikedReviews } from '../actions/user';
import { updateSearch } from '../actions/movies'
import API from '../utils/API';
const moment = require('moment')

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

  // Checks to see if user exists in DB. If not, add the user to the DB
  // function userCheck(userInfo) {
  //   API.findAll().then(res => {
  //     // console.log('db res: ' + JSON.stringify(res.data))
  //     const isUser = res.data.find(({ email }) => email === userInfo.email)
  //     // console.log('is user ' + JSON.stringify(isUser))
  //     // {"id":4,"name":"testing@testing.com","email":"testing@testing.com","dateJoined":null}
  //     if (!isUser) {
  //       API.create(userInfo).then(results => {
  //         console.log('user created successfully :' + JSON.stringify(results.data))
  //         dispatch(setUser(results.data))
  //       })
  //       // {"id":5,"name":"test123@testing.com","email":"test123@testing.com"}
  //     } else {
  //       // console.log('user exists :' + JSON.stringify(isUser))
  //       dispatch(setUser(isUser))
  //       // need to pull db information pertaining to user
  //       // user's reviews
  //       // user's watchlist
  //       // user's favorites
  //       // user's followed
  //     }
  //   })
  // };

  function getUserReviews(id) {
    API.getUserReviews(id).then(reviews =>
      dispatch(setUserReviews(reviews.data)))
  }

  function getUserFavorites(id) {
    API.getUserFavorites(id).then(favorites =>
      dispatch(setUserFavorites(favorites.data)))
  }

  function getUserWatchlist(id) {
    API.getUserWatchlist(id).then(watchlist =>
      dispatch(setUserWatchlist(watchlist.data)))
  }

  function getUserLikedReviews(id) {
    API.getUserLikedReviews(id).then(reviews => {
      console.log(reviews.data)
      dispatch(setUserLikedReviews(reviews.data))
    })
  }

  function findUserOrCreate(userInfo) {
    API.findOrCreateUser(userInfo).then(res => {
      dispatch(setUser(res.data[0]))
      if (res.data[1] === false) {
        console.log('user already exists')
        getUserReviews(res.data[0].id)
        getUserFavorites(res.data[0].id)
        getUserWatchlist(res.data[0].id)
        getUserLikedReviews(res.data[0].id)
      } else {
        console.log('new user created')
        const userName = res.data[0].name
        const userNick = capitalizeFirstLetter(userName.substr(0, userName.indexOf('@')))
        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        };
        let updateObj = {
          dateJoined: moment().format('MMMM Do YYYY'),
          nickname: userNick
        }
        API.updateUser(res.data[0].id, updateObj).then(res => {
          dispatch(setNicknameAndJoin(updateObj))
          // console.log(res.data)
        })
      }
    })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (stateUser.email !== "") {
      return;
    }
    if (user) {

      let userObj = {
        name: user.name,
        email: user.email
      };
      // userCheck(userObj)
      findUserOrCreate(userObj)
    }
  }, [user]);

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
          <Menu.Item>
            <Form onSubmit={handleFormSubmit}>
              <Input
                icon={<Icon name='search' inverted circular link onClick={() => handleFormSubmit()} />}
                placeholder='Search...'
                value={search}
                onChange={handleInputChange}
                action >
              </Input>
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


