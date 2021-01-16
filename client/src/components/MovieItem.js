import React from 'react';
import { Item } from 'semantic-ui-react';

export default function MovieItem(props) {
    // console.log('props', props)
    let posterUrl = ("https://image.tmdb.org/t/p/original" + props.poster)

    return (
        <Item key={props.id}>
            <img
                class='search-img'
                src={posterUrl}
                alt={props.title}
            ></img>

            <Item.Content>
                <Item.Header as='a'>{props.title}</Item.Header>
                <Item.Description>
                    <p><strong>Release Date: </strong>{props.release}</p>
                    <strong>Summary</strong>
                    <p>{props.overview}</p>
                </Item.Description>
            </Item.Content>
        </Item>
    )
}