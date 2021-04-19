import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../utils/API';
import { Button, Card, Container, Divider, Grid, Header, Icon, Image, Label, Menu, Popup, Segment } from 'semantic-ui-react';
import Overview from '../components/OverviewTab';
import Cast from '../components/CastTab';
import CommentSection from '../components/CommentSection';
import MovieCard from '../components/MovieCard';
import { setFilm, setReviews } from '../actions/movies'
import { setUserFavorites, setUserWatchlist } from '../actions/user';

export default function MoviePage() {

    const stateMovie = useSelector(state => state.movies);
    const stateUser = useSelector(state => state.user);
    const filmTmdbId = stateMovie.currentTmdbId;
    const filmDbId = stateMovie.currentFilmId;
    const dispatch = useDispatch();
    const [results, setResults] = useState([]);
    const [related, setRelated] = useState([]);
    const [favorite, setFavorite] = useState(false)
    const [favoriteId, setFavoriteId] = useState([]);
    const [watch, setWatch] = useState(false);
    const [watchId, setWatchId] = useState([]);
    const tabs = ["overview", "cast", "reviews"];
    const [tab, setTab] = useState("overview");
    const backdrop = "https://image.tmdb.org/t/p/original" + results.backdrop_path;
    const currentFilm = window.location.href.slice(30);

    const handleTabChange = page => {
        setTab(page)
    };

    const renderComponent = tab => {
        switch (tab) {
            case "overview": {
                return <Overview info={results} />
            }
            case "cast": {
                return <Cast info={results.credits} />
            }
            case "reviews": {
                return <CommentSection />
            }
        }
    };

    function addToFavorite() {

        if (!stateUser.id) {
            console.log('no user logged in')
            return;
        }
        let favoriteObj = {
            MovieId: filmDbId,
            UserId: stateUser.id
        }
        API.addUserFavorite(favoriteObj).then(res => {
            setFavorite(true)
            setFavoriteId(res.data)
            API.getUserFavorites(stateUser.id).then(favorites => {
                dispatch(setUserFavorites(favorites.data))
            })
        })
    };

    function removeFavorite() {
        const updateArr = stateUser.favorites.filter(ele => ele.MovieId !== filmDbId)
        API.deleteFavorite(favoriteId.id).then(res => {
        })
        dispatch(setUserFavorites(updateArr))
        setFavorite(false)
        setFavoriteId([])
    };

    function addToWatchlist() {
        if (!stateUser.id) {
            console.log('no user logged in')
            return;
        }
        let obj = {
            MovieId: filmDbId,
            UserId: stateUser.id
        }
        API.addToWatchList(obj).then(res => {
            setWatch(true)
            setWatchId(res.data)
            API.getUserWatchlist(stateUser.id).then(watchlist => {
                dispatch(setUserWatchlist(watchlist.data))
            })
        })
    };

    function removeFromWatchlist() {
        const updateArr = stateUser.favorites.filter(ele => ele.MovieId !== filmDbId)
        console.log(watchId)
        API.deleteWatchlist(watchId.id).then(res => {
            console.log(res);
        })
        dispatch(setUserWatchlist(updateArr))
        setWatch(false)
        setWatchId([])
    }

    useEffect(() => {
        API.findByMovieId(currentFilm).then(res => {
            setResults(res.data);
            setRelated(res.data.similar.results.slice(0, 5))
            setTab("overview")
            let movieObj = {
                title: res.data.title,
                tmdbID: res.data.id,
                image: "https://image.tmdb.org/t/p/original" + res.data.backdrop_path
            }
            API.findOrCreateMovie(movieObj).then(res => {
                // res.data has length of 2 (index[0] = db info, index[1] = true/false if created)
                // console.log(`movie findOrCreate ` + JSON.stringify(res.data[0]))
                let hasFavorited = stateUser.favorites.find(({ MovieId }) => MovieId === res.data[0].id)
                if (hasFavorited) {
                    // console.log('users has already favorite this movie')
                    setFavorite(true)
                    setFavoriteId(hasFavorited)
                } else setFavorite(false)

                // Checks to see if the current movie is in the user's watchlist, if found, setWatch to true and setWatchId = the found movie in the watchlist (the id is referenced to delete from db)
                let hasInWatch = stateUser.watchlist.find(({ MovieId }) => MovieId === res.data[0].id)
                console.log(hasInWatch)
                if (hasInWatch) {
                    console.log('user has this in watchlist')
                    setWatch(true)
                    setWatchId(hasInWatch)
                } else setWatch(false)

                dispatch(setFilm(currentFilm, res.data[0].id))
                if (res.data[1] === false) {
                    console.log('movie already exists')
                } else console.log('new movie entry created')
                API.getMovieReviews(res.data[0].id).then(res => {
                    dispatch(setReviews(res.data))
                })
            })
        });
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentFilm]);

    return (
        <>
            {/* style={{height: '500px'}} */}
            {/* <Image fluid src={backdrop} ></Image> */}
            <Container >
                <Grid.Row>
                    <Grid stackable>
                        <Grid.Column width={7}>
                            <Image src={backdrop} size='huge' alt={results.original_title}></Image>
                        </Grid.Column>

                        <Grid.Column width={9}>
                            <Header>{results.original_title}</Header>
                            <>
                                <p><i>{results.tagline}</i></p>
                                <p>Runtime: <b><i>{results.runtime} mins</i></b></p>
                                {results.homepage && (
                                    <p><a href={results.homepage} target="_blank">Official Website</a></p>
                                )}
                            </>
                            {favorite === true ?
                                <Button as='div' labelPosition='right' floated='left' id={results.id} onClick={removeFavorite}>
                                    <Button icon>
                                        {/* Remove */}
                                        <Icon name='heart' color='red' />
                                    </Button>
                                </Button>
                                :
                                <Button as='div' labelPosition='right' floated='left' onClick={addToFavorite}>
                                    <Button icon>
                                        <Icon name='heart' />
                                        {" Add"}
                                    </Button>
                                </Button>
                            }
                            {watch === true ?
                                <Button as='div' icon onClick={removeFromWatchlist}>
                                    <Icon name='remove' color='red' />
                                     {" Remove from watchlist"}
                                </Button>

                                :
                                <Button as='div' icon onClick={addToWatchlist}>
                                    <Icon name='plus' color='blue' />
                                    Watchlist
                                </Button>
                            }

                            <br />
                            {results.genres && (
                                <>
                                    <h4>Genres: </h4>
                                    <Label.Group size='medium'>
                                        {results.genres.map(el => (
                                            <Label key={el.id}> {el.name}</Label>
                                        ))}
                                    </Label.Group>

                                </>
                            )}
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
                <Divider hidden></Divider>
            </Container>

            <Container >
                <Menu attached='top' tabular>
                    {tabs.map(ele => (
                        <Menu.Item
                            name={ele}
                            active={tab === ele}
                            onClick={() => handleTabChange(ele)}
                        />
                    ))}
                </Menu>
                {/* Below will be conditionally rendered depending on which tab is 'active' */}
                <Segment attached='bottom'>
                    {renderComponent(tab)}
                </Segment>
            </Container>
            <Divider hidden></Divider>

            <Container>
                {(related.length > 0) && (
                    <>
                        <Header as='h3' dividing>Similar movies you may enjoy...</Header>
                        <Card.Group itemsPerRow={5} stackable>
                            {related.map(element => (
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
                    </>
                )}
            </Container>
        </>
    )
}