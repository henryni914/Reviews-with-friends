import React, { useEffect, useState } from 'react';
import { Card, Container } from 'semantic-ui-react';
import MovieCard from './MovieCard';
import API from '../utils/API';

export default function PopularSection() {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        API.popularMovies()
            .then(res => { setMovies(res.data.results.slice(0, 5)) })
            .catch(err => console.log(err));
    }, [])

    // Using redux to store movie to state, and retrieving from state to render
    // The below was a test and works, use as reference if needed.

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     API.popularMovies()
    //         .then(res => { dispatch(setTopFive(res.data.results.slice(0,5))) })
    //         .catch(err => console.log(err));
    // }, [])

    // const stateMovies = useSelector(state => state.movies.topFive);

    // console.log('stateMovies' , stateMovies);

    return (
        <Container>
            <h2>Trending movies this week!</h2>
            <Card.Group itemsPerRow={5} stackable>
                {movies.map(element => (
                    <MovieCard
                        key={element.id}
                        id={element.id}
                        title={element.original_title}
                        overview={element.overview}
                        poster={element.poster_path}
                        release={element.release_date}
                    />
                ))}
            </Card.Group>
        </Container>

    )
}