import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../utils/API';
import { Breadcrumb, Container, Divider, Grid, Header, Icon, Image, Input, Label, Menu, Segment } from 'semantic-ui-react';
import Overview from '../components/OverviewTab';
import Cast from '../components/CastTab';

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
                return <Cast info={results} />
            }
        }
    }

    useEffect(() => {
        API.findByMovieId(filmId).then(res => {
            setResults(res.data);
        });
        // API.findProviders(filmId).then(res => {
        //     console.log('providers', res.data.results);
        // })
    }, [])

    console.log('results', results)
    return (
        <>
            {/* style={{height: '500px'}} */}
            {/* <Image fluid src={backdrop} ></Image> */}
            <Container >
                <Grid.Row>
                    <Grid stackable>
                        <Grid.Column width={6}>
                            <Image src={backdrop} size='large' alt={results.original_title}></Image>
                        </Grid.Column>

                        <Grid.Column width={10}>
                            <Header>{results.original_title}</Header>
                            <>
                                <p><i>{results.tagline}</i></p>
                                {results.homepage && (
                                    <a href={results.homepage} target="_blank">Official Movie Website</a>
                                )}
                                <Divider hidden />
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

                            </>
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
        </>
    )
}