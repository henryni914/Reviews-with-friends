import React, { useEffect, useState } from 'react';
import { Card, Container, Pagination } from 'semantic-ui-react';
import MovieCard from '../components/MovieCard'
import API from '../utils/API';

export default function Browse() {

    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [upcomingPage, setUpcomingPage] = useState(1);
    const displayUpcoming = upcomingMovies.slice(
        (upcomingPage - 1) * 5,
        (upcomingPage - 1) * 5 + 5
    )

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedPage, setTopRatedPage] = useState(1);
    const displayTopRated = topRatedMovies.slice(
        (topRatedPage - 1) * 5,
        (topRatedPage - 1) * 5 + 5
    )

    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [nowPlayingPage, setNowPlayingPage] = useState(1)
    const displayNowPlaying = nowPlayingMovies.slice(
        (nowPlayingPage - 1) * 5,
        (nowPlayingPage - 1) * 5 + 5
    )

    function retrieveUpcomingMovies() {
        API.upcomingMovies().then(res => {
            setUpcomingMovies(res.data.results.slice(0, 20))
        })
    }

    function retrieveTopRatedMovies() {
        API.topRatedMovies().then(res => {
            setTopRatedMovies(res.data.results.slice(0, 20))
        })
    }

    function retrieveNowPlayingMovies() {
        API.nowPlayingMovies().then(res => {
            setNowPlayingMovies(res.data.results.slice(0, 20))
        })
    }

    function setUpcoming(event, { activePage }) {
        setUpcomingPage(activePage)
    }

    function setTopRated(event, { activePage }) {
        setTopRatedPage(activePage)
    }

    function setNowPlaying(event, { activePage }) {
        setNowPlayingPage(activePage)
    }

    useEffect(() => {
        retrieveUpcomingMovies()
        retrieveTopRatedMovies()
        retrieveNowPlayingMovies()
    }, [])

    return (
        <Container className='browseContainer'>

            <h3 id="upcoming">Upcoming Movies...</h3>
            <Card.Group itemsPerRow={5} stackable>
                {displayUpcoming.map(element => (
                    <>
                        <MovieCard
                            key={element.id}
                            id={element.id}
                            title={element.original_title}
                            overview={element.overview}
                            poster={element.poster_path}
                            release={element.release_date}
                        />
                    </>
                ))}
                <Pagination
                    className={'pagination'}
                    activePage={upcomingPage}
                    firstItem={null}
                    lastItem={null}
                    totalPages={4}
                    onPageChange={setUpcoming}
                    // href="#upcoming"
                />
            </Card.Group>

            <h3 id="topRated">Top Rated Movies...</h3>
            <Card.Group itemsPerRow={5} stackable>
                {displayTopRated.map(element => (
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
                    activePage={topRatedPage}
                    firstItem={null}
                    lastItem={null}
                    totalPages={4}
                    onPageChange={setTopRated}
                    // href="#topRated"
                />
            </Card.Group>

            <h3 id="nowPlaying">Movies Now Playing...</h3>
            <Card.Group itemsPerRow={5} stackable>
                {displayNowPlaying.map(element => (
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
                    activePage={nowPlayingPage}
                    firstItem={null}
                    lastItem={null}
                    totalPages={4}
                    onPageChange={setNowPlaying}
                    // href="#nowPlaying"
                />
            </Card.Group>
        </Container>
    )
}