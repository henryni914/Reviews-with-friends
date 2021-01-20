import React from 'react';

export default function OverviewTab(props) {
    // console.log('props', props)
    return (
        <>
            <h1>Summary</h1>
            <p><b>Release Date: </b>{props.info.release_date}</p>
            <p>{props.info.overview}</p>
        </>
    )
}