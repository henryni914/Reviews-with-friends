import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilm } from '../actions/movies'

export default function MovieItem(props) {
    // console.log('props', props.id)
    let posterUrl = ("https://image.tmdb.org/t/p/original" + props.poster)
    let filmId = props.id
    const dispatch = useDispatch();
    const storeMovies = useSelector(state => state.movies)
    function storeId(id) {
        console.log('id',id)
        // let selected = stateMovies.filter(element => element.id === id);
        dispatch(setFilm(id));
        // console.log('selected', selected);
    }

    // useEffect(() => {
    //     storeId()
    // }, []);
    
    return (
        <Item >
            <Link onClick={() => storeId(filmId)} to={`/film/id=${props.id}`} >
                <img
                    class='search-img'
                    src={posterUrl}
                    alt={props.title}
                ></img>
            </Link>
            <Item.Content>
                <Link to={`/film/id=${props.id}`} >
                    <Item.Header as='a' >{props.title}</Item.Header>
                </Link>
                <Item.Description>
                    <p><strong>Release Date: </strong>{props.release}</p>
                    <strong>Summary</strong>
                    <p>{props.overview}</p>
                </Item.Description>
            </Item.Content>
        </Item>
    )
}