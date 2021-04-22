import React, { useEffect, useState } from 'react';
import { Card, Dimmer, Image, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilm } from '../actions/movies';

export default function MovieCard(props) {
    const [active, setActive] = useState(true)
    let posterUrl = ("https://image.tmdb.org/t/p/original" + props.poster)
    let shortSummary = props.overview.split(" ").slice(0, 20).join(" ") + "...";
    const dispatch = useDispatch();

    function storeId(id) {
        dispatch(setFilm(id));
    }

    useEffect(() => {
        setTimeout(() => setActive(false), 500)
    },[])

    return (
        <>
            <Card animated
            // href={`/film/id=${props.id}`}
            >
                <Dimmer active={active}>
                    <Loader>Loading</Loader>
                </Dimmer>
                <Link onClick={() => storeId(props.id)} to={`/film/id=${props.id}`}>
                    <Image
                        className='card-img'
                        src={posterUrl}
                        alt={props.title}
                        height="300px"
                    ></Image>
                </Link>
                <Card.Content>
                    <Card.Header>{props.title}</Card.Header>
                    <Card.Meta>{props.release.slice(0, 4)}</Card.Meta>
                </Card.Content>
            </Card>
        </>
    )
}