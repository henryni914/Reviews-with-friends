import React from 'react';

export default function OverviewTab(props) {
    // console.log('props', props)
    return (
        <>
            <h1>Summary</h1>
            <p>{props.info.overview}</p>
        </>
    )
}