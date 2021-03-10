import React from 'react';
import { Container, Dropdown, Grid, Icon, Input, Menu, Segment } from 'semantic-ui-react';

export default function Profile() {

    return (
        <Container>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Menu secondary vertical>
                            <Menu.Item
                                name='account'
                            // active={activeItem === 'account'}
                            // onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='settings'
                            // active={activeItem === 'settings'}
                            // onClick={this.handleItemClick}
                            />
                            <Dropdown item text='Display Options'>
                                <Dropdown.Menu>
                                    <Dropdown.Header>Text Size</Dropdown.Header>
                                    <Dropdown.Item>Small</Dropdown.Item>
                                    <Dropdown.Item>Medium</Dropdown.Item>
                                    <Dropdown.Item>Large</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu>
                    </Grid.Column>
                    {/* Conditional Render below based on active tab */}
                    <Grid.Column width={10}>
                        {/* <Segment>
                            <h1>Test</h1>
                        </Segment> */}
                        <h1>Hello</h1>
                        <h2>World</h2>
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