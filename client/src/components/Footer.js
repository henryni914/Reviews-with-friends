import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react';

export default function Footer() {

  return (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as={Link} to='/'>Home</List.Item>
                <List.Item as={Link} to='/browse'>Browse</List.Item>
                <List.Item as={Link} to='/profile'>Profile</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h4' inverted>
                Notice
                </Header>
              <p>
                Enjoy the website, and please be respectful.
                </p>
                <p>© Copyright 2021</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}