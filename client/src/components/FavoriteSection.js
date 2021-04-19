import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image, Reveal } from 'semantic-ui-react';
import { setUserFavorites } from '../actions/user';
import API from '../utils/API';

const src = "https://image.tmdb.org/t/p/original/srYya1ZlI97Au4jUYAktDe3avyA.jpg"

export default function CardExampleColumnCount() {

    const stateUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [favorites, setFavorites] = useState(stateUser.favorites);

    function deleteFavorite(id) {
        const updateArr = favorites.filter(element => element.id !== id)
        API.deleteFavorite(id).then(res => {
            setFavorites(updateArr)
            dispatch(setUserFavorites(updateArr))
        })
    };

    useEffect(() => {
        API.getUserFavorites(stateUser.id).then(res => {
            setFavorites(res.data)
            // dispatch(setUserFavorites(favorites.data))
        })
        console.log(favorites)
    }, [])

    return (
        <Card.Group stackable itemsPerRow={3}>
            {favorites.length === 0 ? <h3>Add some movies to your favorites, by clicking the heart icon on the movie page.</h3>
                : favorites.map(el => (
                    <Card >
                        <Card.Header textAlign='center'>
                            <i>{el.Movie.title}</i>
                        </Card.Header>
                        {/* link href={`/film/id=${el.Movie.tmdbID}`} */}
                        {/* <div className={'ui fade reveal image'}>
                            <Image src={el.Movie.image} className={'visible content'} />
                            <Image src={el.Movie.image} className={'hidden content hiddenImg'}/>
                        </div> */}
                        <Reveal animated='small fade'>
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
        </Card.Group>
    )
}

