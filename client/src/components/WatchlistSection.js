import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Confirm, Tab } from 'semantic-ui-react'
import API from '../utils/API';
import TabPane from './TabPane';

export default function Watchlist() {

    const stateUser = useSelector(state => state.user);
    console.log(stateUser.favorites)
    const [list, setList] = useState(stateUser.favorites)
    console.log(list)
    // filter an array if 'completed' field is true and pass to completed tab
    // filter an array if 'complete field is false and pass to watchlist tab

    const panes = [
        {
            menuItem: 'Watchlist',
            render: () => <TabPane tab='watchlist' />
        },
        {
            menuItem: 'Completed',
            render: () => <TabPane tab='completed' />
        }
    ]

    return (
        <Tab menu={{ pointing: true }} panes={panes} />
    )
}


// function addToWatchlist() {
//     if (!stateUser.id) {
//         console.log('no user logged in')
//         return;
//     }
//     let obj = {
//         MovieId: filmDbId,
//         UserId: stateUser.id
//     }
// API.addToWatchList(obj).then(res => console.log(res))
// }