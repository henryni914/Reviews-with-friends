import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import { connect } from 'react-redux';

class Nav extends Component {

  componentDidMount() {
    console.log('mount', this.props);
  }

  setUser = () => {
    if (this.props) {
      let userInfo = this.props.userInfo;
      this.props.dispatch({
        type: 'SET_USER',
        payload: {
          id: userInfo.sub,
          nickname: userInfo.nickname,
          picture: userInfo.picture
        }
      })
    }
  }



  render() {
    console.log('nav', this.props.userInfo);

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
              {!(this.props.userInfo) && (
                <LoginButton />
              )}
              {(this.props.userInfo) && (
                <LogoutButton />
              )}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </>
    )


  }

}

const mapStateToProps = state => {
  return { currentUser: state.currentUser }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)

