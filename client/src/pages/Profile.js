import React, { useEffect, useState } from 'react';
import '../App.css'
import UserReviews from '../components/UserReviewPage';
import AccountSettings from '../components/AccountSettings';
import { useDispatch, useSelector } from 'react-redux';
import { setUserReviews } from '../actions/user';
import { Container, Dropdown, Grid, Header, Icon, Input, Menu, Segment } from 'semantic-ui-react';
import API from '../utils/API';

export default function Profile() {

    const stateUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const tabs = ["Account Settings", "Reviews", "Watchlist", "Favorites", "Liked Reviews"];
    const [tab, setTab] = useState("Account Settings");

    const handleTabChange = page => {
        setTab(page)
    };

    const renderComponent = tab => {
        switch (tab) {
            case "Account Settings": {
                return <AccountSettings />
            }
            case "Reviews": {
                return <UserReviews />
            }
            case "Watchlist": {
                return "Replace with component here"
            }
            case "Favorites": {
                return "Replace with component here"
            }
            case "Liked Reviews": {
                return "Replace with component here"
            }
        }
    };

    const renderSubheader = tab => {
        switch (tab) {
            case "Account Settings": {
                return "Manage your account settings"
            }
            case "Reviews": {
                return "Manage your reviews"
            }
            case "Watchlist": {
                return "Manage your watchlist"
            }
            case "Favorites": {
                return "Manage your favorites"
            }
            case "Liked Reviews": {
                return "View posts that you have liked"
            }
        }
    };

    useEffect(() => {
        console.log('tab changing')
        API.getUserReviews(stateUser.id).then(reviews => {
            dispatch(setUserReviews(reviews.data))
        })
    }, [tab])

    return (
        <Container>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column computer={3} tablet={5}>
                        <Menu secondary vertical>
                            {tabs.map(ele => (
                                <Menu.Item
                                    name={ele}
                                    active={tab === ele}
                                    onClick={() => handleTabChange(ele)}
                                />
                            ))}
                            {/* <Dropdown item text='Display Options'>
                                <Dropdown.Menu>
                                    <Dropdown.Header>Text Size</Dropdown.Header>
                                    <Dropdown.Item>Small</Dropdown.Item>
                                    <Dropdown.Item>Medium</Dropdown.Item>
                                    <Dropdown.Item>Large</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </Menu>
                    </Grid.Column>
                    {/* Conditional Render below based on active tab */}
                    {/* 
                    mobile
                    tablet
                    computer
                    largescreen
                    widescreen
                    */}
                    <Grid.Column width={10}>
                        <Header as='h2'>
                            {tab}
                            <Header.Subheader>
                                {renderSubheader(tab)}
                            </Header.Subheader>
                        </Header>
                        <div id="profile">
                            {renderComponent(tab)}
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

// previous side menu
{/* <Grid stackable>
<Grid.Column width={4}>
    <Menu vertical>

        <Menu.Item>
            Home
            <Menu.Menu>
                <Menu.Item
                    name='search'
                // active={activeItem === 'search'}
                // onClick={this.handleItemClick}
                >
                    Search
                </Menu.Item>
                <Menu.Item
                    name='add'
                // active={activeItem === 'add'}
                // onClick={this.handleItemClick}
                >
                    Add
                </Menu.Item>
                <Menu.Item
                    name='about'
                // active={activeItem === 'about'}
                // onClick={this.handleItemClick}
                >
                    Remove
                </Menu.Item>
            </Menu.Menu>
        </Menu.Item>

        <Menu.Item
            name='browse'
        // active={activeItem === 'browse'}
        // onClick={this.handleItemClick}
        >
            <Icon name='grid layout' />
        Browse
        </Menu.Item>
        <Menu.Item
            name='messages'
        // active={activeItem === 'messages'}
        // onClick={this.handleItemClick}
        >
            Messages
        </Menu.Item>

        <Dropdown item text='More'>
            <Dropdown.Menu>
                <Dropdown.Item icon='edit' text='Edit Profile' />
                <Dropdown.Item icon='globe' text='Choose Language' />
                <Dropdown.Item icon='settings' text='Account Settings' />
            </Dropdown.Menu>
        </Dropdown>
    </Menu>
</Grid.Column>
<Grid.Column width={10}>
    <h1>Hello</h1>
</Grid.Column>
</Grid> */}