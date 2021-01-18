import React, { useEffect, useState } from 'react';
import MovieItem from '../components/MovieItem';
import { useDispatch, useSelector } from "react-redux";
import { Container, Divider, Grid, Item, Menu } from 'semantic-ui-react';
import API from '../utils/API';
import { updateSearch } from '../actions/movies';

export default function MovieDisplay() {

    const dispatch = useDispatch();
    const storeMovies = useSelector(state => state.movies);
    const resultsArr = storeMovies.searchResults;
    const [search, setSearch] = useState(storeMovies.search);
    const currentSearch = window.location.href.slice(32);

    // ************
    // Need to save the search keyword and the result either to local storage or another method to keep state before page refresh
    // Also, need to grab the query in the url when user clicks back on their browser to see if its diff 
    // than what is current the search term in the store, if diff re-run the API

    useEffect(() => {
        if (currentSearch !== search) {
            console.log('different')
            API.searchMovies(currentSearch)
                .then(res => {
                    dispatch(updateSearch(search, res.data.results))
                    setSearch("");
                })
                .catch(err => console.log(err));
        }
    },[currentSearch]);

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
                        <h3>Search results from "{currentSearch}"</h3>
                        {resultsArr.length < 1 ?
                            <h1>No results</h1>
                            :
                            <>
                                <Item.Group >
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