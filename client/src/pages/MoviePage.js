import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../utils/API';
import { Breadcrumb, Container, Image, Segment } from 'semantic-ui-react';

export default function MoviePage() {

    const stateMovie = useSelector(state => state.movies);
    const filmId = stateMovie.currentFilmId;
    const [results, setResults] = useState([])
    const backdrop = "https://image.tmdb.org/t/p/original" + results.backdrop_path
    // concat logo_path to below url to get provider logo
    // https://image.tmdb.org/t/p/original

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
            <Container textAlign='center'>
                <Image src={backdrop} size='large'></Image>
                <Breadcrumb>
                    <Breadcrumb.Section link active>Home</Breadcrumb.Section>
                    <Breadcrumb.Divider>/</Breadcrumb.Divider>
                    <Breadcrumb.Section link>Registration</Breadcrumb.Section>
                    <Breadcrumb.Divider>/</Breadcrumb.Divider>
                    <Breadcrumb.Section link>Personal Information</Breadcrumb.Section>
                </Breadcrumb>
                <Segment.Group>
                    <Segment>Top</Segment>
                    <Segment.Group>
                        <Segment>Nested Top</Segment>
                        <Segment>Nested Middle</Segment>
                        <Segment>Nested Bottom</Segment>
                    </Segment.Group>
                    <Segment.Group horizontal>
                        <Segment>Top</Segment>
                        <Segment>Middle</Segment>
                        <Segment>Bottom</Segment>
                    </Segment.Group>
                    <Segment>Bottom</Segment>
                </Segment.Group>
            </Container>
        </>
    )
}