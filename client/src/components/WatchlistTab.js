import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Icon, Image, Tab } from 'semantic-ui-react';
import { setUserWatchlist } from '../actions/user'

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

    function setCompletedTrue(id) {
        const movieArr = movies
        const updateArr = movieArr.map(el => {
            if (el.id === id) {
                el.completed = true
            }
            return el
        })
        dispatch(setUserWatchlist(updateArr))
        setMovies(updateArr)
    };

    function setCompletedFalse(id) {
        const movieArr = movies
        const updateArr = movieArr.map(el => {
            if (el.id === id) {
                el.completed = false
            }
            return el
        })
        dispatch(setUserWatchlist(updateArr))
        setMovies(updateArr)
    };
    // console.log(movies)



    return (

        <Card.Group itemsPerRow={3}>
            {
                notCompleted.length === 0 && props.tab === 'watchlist' ? <h3>Add some movies to your watchlist, by clicking the add to watchlist button on the movie page.</h3>
                    : completed.length === 0 && props.tab === 'completed' ? <h3>Add movies to completed by click the complete button under the watchlist tab </h3>
                        : props.tab === 'watchlist'
                            ?
                            notCompleted.map(el => (
                                <Card >
                                    <Image
                                        size='medium'
                                        src={el.Movie.image}
                                    />
                                    <Button content='Add to finished' labelPosition='left' icon='edit' primary onClick={() => setCompletedTrue(el.id)} />
                                    <Button content='Remove' labelPosition='left' icon='edit' primary />
                                </Card>
                            ))
                            :
                            completed.map(el => (
                                <Card >
                                    <Image
                                        size='medium'
                                        src={el.Movie.image}
                                    />
                                    <Button content='Move back to incomplete' labelPosition='left' icon='edit' primary onClick={() => setCompletedFalse(el.id)} />
                                    <Button content='Remove' labelPosition='left' icon='edit' primary />

                                </Card>
                            ))
            }
        </Card.Group>
    )
}


{/* {props.tab === 'completed' && (
                                        <>
                                            <Button content='Move back to incomplete' labelPosition='left' icon='edit' primary />
                                            <Button content='Remove' labelPosition='left' icon='edit' primary />
                                        </>
                                    )} */}

{/* {props.tab === 'watchlist' && (
                                        <>
                                            <Button content='Undo completed' labelPosition='left' icon='edit' primary id={el.id} />
                                            <Button content='Remove' labelPosition='left' icon='edit' primary />
                                        </>
                                    )} */}

{/* <Button animated='fade' >
                                <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                                <Button.Content hidden>Remove</Button.Content>
                            </Button>
                            <Button animated='fade'  >
                                <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                                <Button.Content hidden>Remove</Button.Content>
                            </Button> */}