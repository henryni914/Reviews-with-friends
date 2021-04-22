import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Icon, Image, Message, Reveal } from 'semantic-ui-react';
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

        <Card.Group itemsPerRow={3} stackable>
            {
                notCompleted.length === 0 && props.tab === 'watchlist'
                    ?
                    <Container>
                        <Message negative>
                            <Message.Header>Nothing to display</Message.Header>
                            <p>Add some movies to your watchlist, by clicking the add to watchlist button on the movie page.</p>
                        </Message>
                    </Container>
                    : completed.length === 0 && props.tab === 'completed'
                        ?
                        <Container>
                            <Message negative>
                                <Message.Header>Nothing to display</Message.Header>
                                <p> Add movies to completed by clicking the complete button under the watchlist tab. </p>
                            </Message>
                        </Container>
                        : props.tab === 'watchlist'
                            ?
                            notCompleted.map(el => (
                                <Card key={el.id}>
                                    <Card.Header textAlign='center'>
                                        {/* <i>{el.Movie.title}</i> */}
                                    </Card.Header>
                                    <Reveal animated='small fade'>
                                        <Reveal.Content visible>
                                            <Link to={`/film/id=${el.Movie.tmdbID}`}>
                                                <Image
                                                    size='large'
                                                    src={el.Movie.image}
                                                    alt={el.Movie.title}
                                                />
                                            </Link>
                                        </Reveal.Content>
                                        <Reveal.Content hidden>
                                            <div className='hiddenTitle'>
                                                {el.Movie.title}
                                            </div>
                                            <Image
                                                className='hiddenImg'
                                                size='large'
                                                src={el.Movie.image}
                                                alt={el.Movie.title}
                                            />
                                        </Reveal.Content>
                                    </Reveal>

                                    <Button content='Complete?' labelPosition='left' icon='check' onClick={() => setCompletedTrue(el.id)} />
                                    <Button content='Delete' color='red' labelPosition='left' icon='delete' onClick={() => deleteWatchlist(el.id)} />
                                </Card>
                            ))
                            :
                            completed.map(el => (
                                <Card key={el.id}>
                                    <Card.Header textAlign='center'>
                                        {/* <i>{el.Movie.title}</i> */}
                                    </Card.Header>
                                    <Reveal animated='small fade'>
                                        <Reveal.Content visible>
                                            <Link to={`/film/id=${el.Movie.tmdbID}`}>
                                                <Image
                                                    size='large'
                                                    src={el.Movie.image}
                                                    alt={el.Movie.title}
                                                />
                                            </Link>
                                        </Reveal.Content>
                                        <Reveal.Content hidden>
                                            <div className='hiddenTitle'>
                                                {el.Movie.title}
                                            </div>
                                            <Image
                                                className='hiddenImg'
                                                size='large'
                                                src={el.Movie.image}
                                                alt={el.Movie.title}
                                            />
                                        </Reveal.Content>
                                    </Reveal>
                                    <Button content='Not complete?' labelPosition='left' icon='undo' onClick={() => setCompletedFalse(el.id)} />
                                    <Button content='Delete' color='red' labelPosition='left' icon='delete' onClick={() => deleteWatchlist(el.id)} />

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