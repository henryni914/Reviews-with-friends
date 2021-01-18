import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../utils/API';
import { Breadcrumb, Container, Divider, Grid, Header, Image, Input, Menu, Segment } from 'semantic-ui-react';
import Overview from '../components/OverviewTab';
import Cast from '../components/CastTab';

export default function MoviePage() {

    const stateMovie = useSelector(state => state.movies);
    const filmId = stateMovie.currentFilmId;
    const [results, setResults] = useState([])
    const [tab, setTab] = useState("overview")
    const backdrop = "https://image.tmdb.org/t/p/original" + results.backdrop_path
    const handleTabChange = page => {
        setTab(page)
    };

    const renderComponent = component => {
        switch(tab){
            case "overview": {
                return <Overview />
            }
            case "cast": {
                return <Cast />
            }
        }
    }

    useEffect(() => {
        API.findByMovieId(filmId).then(res => {
            setResults(res.data);
        });
        API.findProviders(filmId).then(res => {
            console.log('providers', res.data.results);
        })
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
                                <p>Testing</p>
                                <p>Testing</p>
                                <p>Testing</p>
                            </>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
                <Divider hidden></Divider>
            </Container>
            
            <Container textAlign='center'>
                <Menu attached='top' tabular>
                    <Menu.Item
                        name='overview'
                        active={tab === 'overview'}
                        onClick={() => handleTabChange("overview")}
                    />
                    <Menu.Item
                        name='cast'
                        active={tab === 'cast'}
                        onClick={() => handleTabChange("cast")}
                    />
                </Menu>
                {/* Below will be conditionally rendered depending on which tab is 'active' */}
                <Segment attached='bottom'>
                    {renderComponent(tab)}
                </Segment>
            </Container>
        </>
    )
}