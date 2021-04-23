import React, { useEffect, useState } from 'react';
import '../App.css'
import UserReviews from '../components/UserReviewPage';
import AccountSettings from '../components/AccountSettings';
import FavoriteSection from '../components/FavoriteSection';
import Watchlist from '../components/WatchlistSection';
import LikedReviews from '../components/LikedReview';
import { useDispatch, useSelector } from 'react-redux';
import { setUserReviews, setUserFavorites, setUserWatchlist, setUserLikedReviews } from '../actions/user';
import { Container, Grid, Header, Menu } from 'semantic-ui-react';
import API from '../utils/API';

export default function Profile() {

    const stateUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const tabs = ["Account Settings", "Reviews", "Watchlist", "Favorites", "Liked Reviews"];
    const [tab, setTab] = useState("Account Settings");
    const [reviews, setReviews] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [likedReviews, setLikedReviews] = useState([]);

    const handleTabChange = page => {
        setTab(page)
    };

    const renderComponent = tab => {
        switch (tab) {
            case "Account Settings": {
                return <AccountSettings />
            }
            case "Reviews": {
                return (<UserReviews reviews={reviews} />)
            }
            case "Watchlist": {
                return <Watchlist watchlist={watchlist} />
            }
            case "Favorites": {
                return (
                    <FavoriteSection favorites={favorites} />)
            }
            case "Liked Reviews": {
                return (
                    <LikedReviews reviews={likedReviews} />)
            }
        }
    };

    const renderSubheader = tab => {
        switch (tab) {
            case "Account Settings": {
                return "Manage your account settings"
            }
            case "Reviews": {
                return "Manage your reviews"
            }
            case "Watchlist": {
                return "Manage your watchlist"
            }
            case "Favorites": {
                return "Manage your favorites"
            }
            case "Liked Reviews": {
                return "View posts that you have liked"
            }
        }
    };

    useEffect(() => {
        // console.log('tab changing')
        // console.log(stateUser.id)
        if (stateUser.id) {
            console.log('user id is here')
            API.getUserReviews(stateUser.id).then(reviews => {
                // console.log(reviews.data)
                setReviews(reviews.data)
                // dispatch(setUserReviews(reviews.data))
            });
            API.getUserFavorites(stateUser.id).then(favorites => {
                // console.log(favorites.data)
                setFavorites(favorites.data)
                // dispatch(setUserFavorites(favorites.data))
            });
            API.getUserWatchlist(stateUser.id).then(watchlist => {
                // console.log(watchlist.data)
                setWatchlist(watchlist.data)
                // dispatch(setUserWatchlist(watchlist.data))
            });
            API.getUserLikedReviews(stateUser.id).then(reviews => {
                // console.log(reviews.data)
                setLikedReviews(reviews.data)
                // dispatch(setUserLikedReviews(reviews.data))
            });
        } else {
            console.log('no id present')
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [tab])

    return (
        <Container>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column computer={3} tablet={5}>
                        <Menu secondary vertical>
                            {tabs.map(ele => (
                                <Menu.Item
                                    name={ele}
                                    active={tab === ele}
                                    onClick={() => handleTabChange(ele)}
                                />
                            ))}
                            {/* <Dropdown item text='Display Options'>
                                <Dropdown.Menu>
                                    <Dropdown.Header>Text Size</Dropdown.Header>
                                    <Dropdown.Item>Small</Dropdown.Item>
                                    <Dropdown.Item>Medium</Dropdown.Item>
                                    <Dropdown.Item>Large</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </Menu>
                    </Grid.Column>
                    <Grid.Column stretched computer={13} tablet={11}>
                        <Header as='h2'>
                            {tab}
                            <Header.Subheader>
                                {renderSubheader(tab)}
                            </Header.Subheader>
                        </Header>
                        <div id="profile">
                            {renderComponent(tab)}
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}