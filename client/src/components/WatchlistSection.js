import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Confirm, Container, Menu, Segment } from 'semantic-ui-react'
import API from '../utils/API';
import Tab from './WatchlistTab';

export default function Watchlist() {

    const stateUser = useSelector(state => state.user);
    // console.log(stateUser.watchlist)
    const [list, setList] = useState(stateUser.watchlist);
    const [notCompleted, setNotCompleted] = useState([]);
    const [completed, setCompleted] = useState([]);
    const tabs = ["watchlist", "completed"];
    const [tab, setTab] = useState('watchlist')

    function runFilters() {
        const filterNotCompleted = list.filter(ele => ele.completed === false);
        setNotCompleted(filterNotCompleted)
        const filterCompleted = list.filter(ele => ele.completed === true);
        setCompleted(filterCompleted)
    }

    // filter an array if 'completed' field is true and pass to completed tab
    // filter an array if 'complete field is false and pass to watchlist tab

    const handleTabChange = page => {
        setTab(page)
    };

    const renderComponent = tab => {
        switch (tab) {
            case "watchlist": {
                return <Tab tab={tab} movies={notCompleted}/>
            }
            case "completed": {
                return <Tab tab={tab} movies={completed}/>
            }
        }
    };

    useEffect(() => {
        runFilters()
    }, [tab])

    return (

        <Container>
            <Menu pointing>
                {tabs.map(ele => (
                    <Menu.Item
                        name={ele}
                        active={tab === ele}
                        onClick={() => handleTabChange(ele)}
                    />
                ))}
            </Menu>
            <Segment attached='bottom'>
                {renderComponent(tab)}
            </Segment>
        </Container>
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
