import React, { useEffect, useState } from 'react';
import { Card, Container, Grid, Pagination } from 'semantic-ui-react';
import MovieCard from '../components/MovieCard'
import API from '../utils/API';

export default function Browse() {

    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [upcomingPage, setUpcomingPage] = useState(1);
    const [displayUpcoming, setDisplayUpcoming] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedPage, setTopRatedPage] = useState(1);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [nowPlayingPage, setNowPlayingPage] = useState(1)

    function retrieveUpcomingMovies() {
        API.upcomingMovies().then(res => {
            setUpcomingMovies(res.data.results.slice(0, 20))
            setDisplayUpcoming(res.data.results.slice(0, 5))
        })
    }

    function retrieveTopRatedMovies() {
        API.topRatedMovies().then(res => {
            setTopRatedMovies(res.data.results.slice(0, 5))
            // console.log(res.data)
        })
    }

    function retrieveNowPlayingMovies() {
        API.nowPlayingMovies().then(res => {
            setNowPlayingMovies(res.data.results.slice(0, 5))
            // console.log(res.data)
        })
    }

    function setPage(event, { activePage }) {
        const items = 5;
        const page = activePage;
        const updateArr = upcomingMovies.slice(
            (page - 1) * items,
            (page - 1) * items + items
        )
        setDisplayUpcoming(updateArr)
        setUpcomingPage(activePage)
    }

    useEffect(() => {
        retrieveUpcomingMovies()
        retrieveTopRatedMovies()
        retrieveNowPlayingMovies()
    }, [])

    return (
        <Container className='browseContainer'>
            <h3>Upcoming Movies...</h3>
            <Card.Group itemsPerRow={5} stackable>
                {displayUpcoming.map(element => (
                    <MovieCard
                        key={element.id}
                        id={element.id}
                        title={element.original_title}
                        overview={element.overview}
                        poster={element.poster_path}
                        release={element.release_date}
                    />
                ))}
                <Pagination
                    className={'pagination'}
                    defaultActivePage={1}
                    activePage={upcomingPage}
                    firstItem={null}
                    lastItem={null}
                    totalPages={4}
                    onPageChange={setPage}
                />
            </Card.Group>


            {/* <h3>Top Rated Movies...</h3>
            <Card.Group itemsPerRow={5} stackable>
                {topRatedMovies.map(element => (
                    <MovieCard
                        key={element.id}
                        id={element.id}
                        title={element.original_title}
                        overview={element.overview}
                        poster={element.poster_path}
                        release={element.release_date}
                    />
                ))}
            </Card.Group> */}

            {/* <h3>Movies Now Playing...</h3>
            <Card.Group itemsPerRow={5} stackable>
                {nowPlayingMovies.map(element => (
                    <MovieCard
                        key={element.id}
                        id={element.id}
                        title={element.original_title}
                        overview={element.overview}
                        poster={element.poster_path}
                        release={element.release_date}
                    />
                ))}
            </Card.Group> */}
        </Container>
    )
}