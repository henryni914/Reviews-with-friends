import React from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { useAuth0 } from '../utils/auth0context';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

export default function Nav() {
  const { user, isAuthenticated } = useAuth0();
  console.log(user)

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
            {!isAuthenticated && (
            <LoginButton />
            )}
            {isAuthenticated && (
              <LogoutButton />
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  )
}



