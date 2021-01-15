import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default function MovieCard(props) {
    console.log('movieCard', props)
    let posterUrl = ("https://image.tmdb.org/t/p/original" + props.poster)
    let shortSummary = props.overview.split(" ").slice(0,20).join(" ") + "...";

    return (
        <Card >
            <img 
            class='popular-img'
            src={posterUrl}
            alt={props.title}
            height="300px"
            ></img>
            <Card.Content>
                <Card.Header>{props.title}</Card.Header>
                <Card.Meta>Release Date: {props.release}</Card.Meta>
                <Card.Description>
                    {shortSummary}
                </Card.Description>
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