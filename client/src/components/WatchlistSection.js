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

    // filter an array if 'completed' field is true and pass to completed tab
    // filter an array if 'complete field is false and pass to watchlist tab

    const handleTabChange = page => {
        setTab(page)
        // if (page === "watchlist") {
        //     const filterNotCompleted = list.filter(ele => ele.completed === false);
        //     setNotCompleted(filterNotCompleted)
        //     // console.log('watchlist')
        // } else if (page === "completed") {
        //     const filterCompleted = list.filter(ele => ele.completed === true);
        //     setCompleted(filterCompleted)
        //     // console.log('completed')
        // }
    };

    const renderComponent = tab => {
        switch (tab) {
            case "watchlist": {
                return <Tab tab={tab} />
            }
            case "completed": {
                return <Tab tab={tab} />
            }
        }
    };

    // useEffect(() => {
    //     // console.log('running')
    //     const filterNotCompleted = list.filter(ele => ele.completed === false);
    //     setNotCompleted(filterNotCompleted)
    //     // const testArr = list.map(el => {
    //     //     if (el.id === 9) {
    //     //         el.completed = true
    //     //     }
    //     //     return el
    //     // })
    //     // console.log(testArr)
    // }, [tab])


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
