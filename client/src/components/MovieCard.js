import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilm } from '../actions/movies';

export default function MovieCard(props) {
    // console.log('movieCard', props)
    let posterUrl = ("https://image.tmdb.org/t/p/original" + props.poster)
    let shortSummary = props.overview.split(" ").slice(0, 20).join(" ") + "...";
    const dispatch = useDispatch();

    function storeId(id) {
        dispatch(setFilm(id));
    }

    return (
        <Card >
            <Link onClick={() => storeId(props.id)} to={`/film/id=${props.id}`}>
                <img
                    class='popular-img'
                    src={posterUrl}
                    alt={props.title}
                    height="300px"
                ></img>
            </Link>
            <Card.Content>
                <Card.Header>{props.title}</Card.Header>
                <Card.Meta><strong>Release Date: </strong> {props.release}</Card.Meta>
                {/* <Card.Description>
                    {shortSummary}
                </Card.Description> */}
            </Card.Content>
            {/* the extra content can be removed or changed later */}
            {/* <Card.Content extra>
                <a>
                    <Icon name='user' />
                    10 Friends
                </a>
            </Card.Content> */}
        </Card>
    )
}