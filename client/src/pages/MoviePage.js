import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../utils/API';
import { Button, Card, Container, Divider, Grid, Header, Icon, Image, Label, Menu, Segment } from 'semantic-ui-react';
import Overview from '../components/OverviewTab';
import Cast from '../components/CastTab';
import CommentSection from '../components/CommentSection';
import MovieCard from '../components/MovieCard';

export default function MoviePage() {

    const stateMovie = useSelector(state => state.movies);
    const filmId = stateMovie.currentFilmId;
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
        if (currentFilm !== filmId) {
            API.findByMovieId(currentFilm).then(res => {
                setResults(res.data);
                setRelated(res.data.similar.results.slice(0, 5))
                setTab("overview")
                // console.log('related', related)
            });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
        console.log(stateMovie)
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