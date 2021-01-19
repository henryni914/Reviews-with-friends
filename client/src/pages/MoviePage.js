import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../utils/API';
import { Breadcrumb, Container, Divider, Grid, Header, Icon, Image, Input, Item, Label, Menu, Segment } from 'semantic-ui-react';
import Overview from '../components/OverviewTab';
import Cast from '../components/CastTab';
import CommentSection from '../components/CommentSection';

export default function MoviePage() {

    const stateMovie = useSelector(state => state.movies);
    const filmId = stateMovie.currentFilmId;
    const [results, setResults] = useState([])
    const tabs = ["overview", "cast", "watch"]
    const [tab, setTab] = useState("overview")
    const backdrop = "https://image.tmdb.org/t/p/original" + results.backdrop_path
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
        }
    };

    useEffect(() => {
        API.findByMovieId(filmId).then(res => {
            setResults(res.data);
        });
    }, []);

    // console.log('results', results)
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
                                <p>Release Date: {results.release_date}</p>
                                <p>Runtime: <b>{results.runtime} mins</b></p>
                                {results.homepage && (
                                    <p><a href={results.homepage} target="_blank">Official Movie Website</a></p>
                                )}
                            </>
                            {results.genres && (
                                <>
                                    <Header>Genres: </Header>
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
                <CommentSection />
            </Container>
        </>
    )
}