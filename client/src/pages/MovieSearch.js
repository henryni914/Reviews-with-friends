import React from 'react';
import Navbar from '../components/Navbar';
import MovieItem from '../components/MovieItem';
import { useSelector } from "react-redux";
import { Container, Divider, Item } from 'semantic-ui-react'

export default function MovieDisplay() {

    const storeMovies = useSelector(state => state.movies);
    const resultsArr = storeMovies.searchResults;
    console.log("stateMovies", storeMovies);

    return (
        <>
            <Container>
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
            </Container>
        </>
    )
}