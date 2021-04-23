import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Icon, Image, Message, Pagination, Reveal } from 'semantic-ui-react';
import { setUserFavorites } from '../actions/user';
import API from '../utils/API';

const src = "https://image.tmdb.org/t/p/original/srYya1ZlI97Au4jUYAktDe3avyA.jpg"

export default function CardExampleColumnCount(props) {
    // console.log(props.favorites)

    const stateUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [favorites, setFavorites] = useState(props.favorites);
    const [page, setPage] = useState(1)
    const pages = Math.floor(favorites.length / 9) + 1
    const display = favorites.slice(
        (page - 1) * 9,
        (page - 1) * 9 + 9
    )


    function handlePageChange(event, { activePage }) {
        setPage(activePage)
    }

    function deleteFavorite(id) {
        const updateArr = favorites.filter(element => element.id !== id)
        API.deleteFavorite(id).then(res => {
            setFavorites(updateArr)
            dispatch(setUserFavorites(updateArr))
        })
    };

    function getUserFavorites(id) {
        API.getUserFavorites(id).then(res => {
            setFavorites(res.data)
            dispatch(setUserFavorites(res.data))
        })
    }

    // useEffect(() => {
    // API.getUserFavorites(stateUser.id).then(res => {
    //     setFavorites(res.data)
    //     dispatch(setUserFavorites(favorites.data))
    // })
    // }, [favorites])

    useEffect(() => {
        // setFavorites(stateUser.favorites)
        // getUserFavorites(stateUser.id)
        // console.log(favorites)
    }, [])

    // console.log(display)

    return (
        <Container >
            <Card.Group stackable itemsPerRow={3}>
                {props.favorites.length === 0 ?
                    <Container>
                        <Message negative>
                            <Message.Header>Nothing to display</Message.Header>
                            <p>Add some movies to your favorites, by clicking the heart icon on the movie page. </p>
                        </Message>
                    </Container>
                    :
                    display.map(el => (
                        <Card >
                            <Reveal animated='small fade' >
                                <Reveal.Content visible>
                                    <Link to={`/film/id=${el.Movie.tmdbID}`}>
                                        <Image
                                            size='medium'
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
                                        size='medium'
                                        src={el.Movie.image}
                                        alt={el.Movie.title}
                                    />
                                </Reveal.Content>
                            </Reveal>

                            <Button animated='fade' floated='right' onClick={() => deleteFavorite(el.id)}>
                                <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                                <Button.Content hidden>Remove</Button.Content>
                            </Button>
                        </Card>
                    ))
                }
                {props.favorites.length === 0
                    ? <></>
                    :
                    < Pagination
                        className={'paginationProfile'}
                        activePage={page}
                        firstItem={null}
                        lastItem={null}
                        totalPages={pages}
                        onPageChange={handlePageChange}
                    />
                }
            </Card.Group>
        </Container>
    )
}

