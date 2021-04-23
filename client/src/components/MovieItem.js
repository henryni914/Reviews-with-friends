import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { setFilm } from '../actions/movies'

export default function MovieItem(props) {
    let posterUrl = ("https://image.tmdb.org/t/p/original" + props.poster)
    const dispatch = useDispatch();
    // const storeMoviesArr = useSelector(state => state.movies.searchResults)
    function storeId(id) {
        dispatch(setFilm(id));
        // Finds the current selected film inside the array and returns the movie id === selected id
        // let selected = storeMoviesArr.filter(element => element.id === id);
    }

    return (
        <Item >
            <Link onClick={() => storeId(props.id)} to={`/film/id=${props.id}`} >
                <img
                    className='search-img'
                    src={posterUrl}
                    alt={props.title}
                ></img>
            </Link>
            <Item.Content>
                <Link onClick={() => storeId(props.id)} to={`/film/id=${props.id}`} >
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