import React from 'react';
import Navbar from '../components/Navbar';
import MovieItem from '../components/MovieItem';
import { useSelector } from "react-redux";
import { Container, Divider, Grid, Item, Menu } from 'semantic-ui-react'

export default function MovieDisplay() {

    const storeMovies = useSelector(state => state.movies);
    const resultsArr = storeMovies.searchResults;
    console.log("stateMovies", storeMovies);

    return (
        <>
            <Container>
                <Grid columns='equal'>
                    <Grid.Column width={3}>
                        <Menu text vertical>
                            <Menu.Item header>Sort By</Menu.Item>
                            <Menu.Item
                                name='closest'
                                // active={activeItem === 'closest'}
                                // onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='mostComments'
                                // active={activeItem === 'mostComments'}
                                // onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='mostPopular'
                                // active={activeItem === 'mostPopular'}
                                // onClick={this.handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <h3>Search results from "{storeMovies.search}"</h3>
                        {resultsArr.length < 1 ?
                            <h1>No results</h1>
                            :
                            <>
                                <Item.Group>
                                    {resultsArr.map(element => (
                                        <>
                                            <MovieItem
                                                id={element.id}
                                                title={element.original_title}
                                                overview={element.overview}
                                                poster={element.poster_path}
                                                release={element.release_date}
                                            />
                                            <Divider section />
                                        </>
                                    ))}
                                </Item.Group>
                            </>
                        }
                    </Grid.Column>
                </Grid>
            </Container>
        </>
    )
}