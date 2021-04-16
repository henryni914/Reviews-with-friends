import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Icon, Image, Tab } from 'semantic-ui-react';
import { setUserWatchlist } from '../actions/user';
import API from '../utils/API';

export default function TabPane(props) {

    const dispatch = useDispatch();
    const stateUser = useSelector(state => state.user);
    const [movies, setMovies] = useState(stateUser.watchlist);

    const notCompleted = movies.filter(el => {
        if (el.completed === false) {
            return el
        }
    });

    const completed = movies.filter(el => {
        if (el.completed === true) {
            return el
        }
    });

    // When user presses button, find matching id in watchlist and set completed = true
    function setCompletedTrue(id) {
        const movieArr = movies
        const updateArr = movieArr.map(el => {
            if (el.id === id) {
                el.completed = true
            }
            return el
        })
        API.editUserWatchlist(id, { completed: true }).then(res => {
            console.log(res)
        })
        dispatch(setUserWatchlist(updateArr))
        setMovies(updateArr)
    };

    // When user presses button, find matching id in watchlist and set completed = false
    function setCompletedFalse(id) {
        const movieArr = movies
        const updateArr = movieArr.map(el => {
            if (el.id === id) {
                el.completed = false
            }
            return el
        })
        API.editUserWatchlist(id, { completed: false }).then(res => {
            console.log(res)
        })
        dispatch(setUserWatchlist(updateArr))
        setMovies(updateArr)
    };

    // When user presses button, find matching id in watchlist and delete from db
    function deleteWatchlist(id) {
        const movieArr = movies
        const updateArr = movieArr.filter(el => el.id !== id)
        API.deleteWatchlist(id).then(res => {
            console.log(res)
        })
        dispatch(setUserWatchlist(updateArr))
        setMovies(updateArr)
    }

    return (

        <Card.Group itemsPerRow={3}>
            {
                notCompleted.length === 0 && props.tab === 'watchlist' ? <h3>Add some movies to your watchlist, by clicking the add to watchlist button on the movie page.</h3>
                    : completed.length === 0 && props.tab === 'completed' ? <h3>Add movies to completed by click the complete button under the watchlist tab </h3>
                        : props.tab === 'watchlist'
                            ?
                            notCompleted.map(el => (
                                <Card key={el.id}>
                                    <Image
                                        size='medium'
                                        src={el.Movie.image}
                                    />
                                    <Button content='Add to finished' labelPosition='left' icon='edit' primary onClick={() => setCompletedTrue(el.id)} />
                                    <Button content='Remove' labelPosition='left' icon='edit' primary onClick={() => deleteWatchlist(el.id)} />
                                </Card>
                            ))
                            :
                            completed.map(el => (
                                <Card key={el.id}>
                                    <Image
                                        size='medium'
                                        src={el.Movie.image}
                                    />
                                    <Button content='Move back to incomplete' labelPosition='left' icon='edit' primary onClick={() => setCompletedFalse(el.id)} />
                                    <Button content='Remove' labelPosition='left' icon='edit' primary onClick={() => deleteWatchlist(el.id)} />

                                </Card>
                            ))
            }
        </Card.Group>
    )
}

{/* <Button animated='fade' >
                                <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                                <Button.Content hidden>Remove</Button.Content>
                            </Button>
                            <Button animated='fade'  >
                                <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                                <Button.Content hidden>Remove</Button.Content>
                            </Button> */}