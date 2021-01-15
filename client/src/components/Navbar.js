import React, { useEffect } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import { useAuth0 } from '../utils/auth0context';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../actions/user';

export default function Nav() {

  const { user, isAuthenticated } = useAuth0();
  console.log('nav', user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
      console.log('user set');
    }
  }, [user])


  const stateUser = useSelector(state => state.user)
  console.log('stateUser', stateUser)

  return (
    <>
      <Menu inverted borderless>
        <Menu.Item
          name='home'
        // onClick={this.handleItemClick}
        />
        <Menu.Item
          name='movies'
        // onClick={this.handleItemClick}
        />
        <Menu.Item
          name='profile'
        // onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
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


