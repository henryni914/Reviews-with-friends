import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'semantic-ui-react';
import API from '../utils/API';

const src = "https://image.tmdb.org/t/p/original/srYya1ZlI97Au4jUYAktDe3avyA.jpg"

export default function CardExampleColumnCount() {

    const stateUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        API.getUserFavorites(stateUser.id).then(res => 
            setFavorites(res.data), console.log(favorites))
    },[])

    return (
        <Card.Group itemsPerRow={3}>
            <Card image={src} />
            <Card
                href='#card-example-link-card'
                header='Elliot Baker'
                meta='Friend'
                description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
            />
            <Card raised image={src} />
            <Card raised image={src} />
            <Card raised image={src} />
            <Card raised image={src} />
        </Card.Group>
    )
}

