import React from 'react';
import { Grid, Container, List } from 'semantic-ui-react'

export default function About() {

    return (
        <Container>
            <Grid columns='equal' stackable divided>
                <Grid.Row>
                    <Grid.Column>
                        <h2>Features</h2>
                        <List>
                            <List.Item>
                                <List.Header >Search & Browse</List.Header>
                                <List.Description>
                                    Users can use the search field in the navigation bar, or venture into the browse tab to find movies.
                                </List.Description>
                            </List.Item>
                            <List.Item>
                                <List.Header >Reviews</List.Header>
                                <List.Description>
                                    Users can submit their own review for a movie, by navigating to the movie's page.
                                </List.Description>
                            </List.Item>
                        </List>
                    </Grid.Column>

                    <Grid.Column>
                        <h2>More Features</h2>
                        <List>
                            <List.Item>
                                <List.Header >Watchlist</List.Header>
                                <List.Description>
                                  With the watchlist, users can manage movies that they have either completed or not completed.
                                </List.Description>
                            </List.Item>
                            <List.Item>
                                <List.Header >Favorites</List.Header>
                                <List.Description>
                                    The favorites feature allows users to track movies that they enjoy.
                                </List.Description>
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}