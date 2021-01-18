import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import API from '../utils/API';

export default function MoviePage() {

    const stateMovie = useSelector(state => state.movies)
    console.log('stateMovie', stateMovie);
    // function loadMovie() {
    //     API.findByMovieId().then(res => {
    //         // 
    //     })
    // }
    // useEffect(() => {
    //     API.findByMovieId()
    // })

    return(
        <h1>Testing</h1>
    )
}