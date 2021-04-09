import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../utils/API';
import { Button, Card, Container, Divider, Grid, Header, Icon, Image, Label, Menu, Segment } from 'semantic-ui-react';
import Overview from '../components/OverviewTab';
import Cast from '../components/CastTab';
import CommentSection from '../components/CommentSection';
import MovieCard from '../components/MovieCard';
import { setFilm, setReviews } from '../actions/movies'

export default function MoviePage() {

    const stateMovie = useSelector(state => state.movies);
    const stateUser = useSelector(state => state.user);
    const filmTmdbId = stateMovie.currentTmdbId;
    const filmDbId = stateMovie.currentFilmId;
    const dispatch = useDispatch();
    const [results, setResults] = useState([]);
    const [related, setRelated] = useState([]);
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

    useEffect(() => {
        console.log('starting new API call', currentFilm)
        API.findByMovieId(currentFilm).then(res => {
            setResults(res.data);
            setRelated(res.data.similar.results.slice(0, 5))
            console.log(res.data)
            setTab("overview")
            let movieObj = {
                title: res.data.title,
                tmdbID: res.data.id,
                image: "https://image.tmdb.org/t/p/original" + res.data.backdrop_path
            }
            API.findOrCreateMovie(movieObj).then(res => {
                // res.data has length of 2 (index[0] = db info, index[1] = true/false if created)
                // console.log(`movie findOrCreate ` + JSON.stringify(res.data[0]))
                dispatch(setFilm(currentFilm, res.data[0].id))
                // if (res.data[1] === false) {
                //     console.log('movie already exists')
                // } else console.log('new movie entry created')
                API.getMovieReviews(res.data[0].id).then(res => {
                    console.log(res.data)
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
                            <Button as='div' labelPosition='right' floated='left'>
                                <Button icon>
                                    {/* check here if user has "liked" this movie, color=red, if not no color */}
                                    <Icon name='heart' color='red' />
                                </Button>

                            </Button>
                            <Button as='div' icon>
                                <Icon name='plus' color='blue' />
                                {/* if included in user watchlist, text should change to "Added" or something to reflect  */}
                                     Watchlist
                            </Button>
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