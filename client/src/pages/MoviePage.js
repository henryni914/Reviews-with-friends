import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../utils/API';

export default function MoviePage() {

    const stateMovie = useSelector(state => state.movies);
    const filmId = stateMovie.currentFilmId;
    const [results, setResults] = useState([])

    useEffect(() => {
        API.findByMovieId(filmId).then(res => {
            // console.log('res', res.data)
            setResults(res.data)
        })
    },[])

    console.log('results', results)
    return(
        <h1>{results.original_title}</h1>
    )
}