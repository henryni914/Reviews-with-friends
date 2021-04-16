import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Confirm, Container, Menu, Segment } from 'semantic-ui-react'
import API from '../utils/API';
import Tab from './WatchlistTab';

export default function Watchlist() {

    const tabs = ["watchlist", "completed"];
    const [tab, setTab] = useState('watchlist')

    const handleTabChange = page => {
        setTab(page)
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
};
