import React, { useState } from 'react';
import { Container, Menu } from 'semantic-ui-react'
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
            {/* <Segment attached='bottom'>
          
            </Segment> */}
            {renderComponent(tab)}
        </Container>
    )
};
