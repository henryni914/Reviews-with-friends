import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Icon, Item, Message } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { setFilm } from '../actions/movies';
import { setUserLikedReviews } from '../actions/user'
import API from '../utils/API';

export default function LikedReviews(props) {
    const dispatch = useDispatch();
    const stateUser = useSelector(state => state.user)
    const [posts, setPosts] = useState([])

    function storeId(id) {
        dispatch(setFilm(id));
    };

    function removeLike(id) {
        const updateArr = posts.filter(element => element.id !== id)
        API.removeLike(id).then(res => {
            setPosts(updateArr)
            dispatch(setUserLikedReviews(updateArr))
        })
    };

    function getUserLikedReviews(id) {
        API.getUserLikedReviews(id).then(reviews => {
            setPosts(reviews.data)
            dispatch(setUserLikedReviews(reviews.data))
        })
    };


    useEffect(() => {
        if (stateUser.email !== "") {
            getUserLikedReviews(stateUser.id)
        }
    }, [])


    return (
        <Item.Group>

            {posts.length === 0
                ?
                <Container>
                    <Message negative>
                        <Message.Header>Nothing to display</Message.Header>
                        <p>Press the like button on reviews and they will appear here.</p>
                    </Message>
                </Container>
                : posts.map(ele => (
                    <>
                        <Item>
                            <Item.Content >
                                <Link onClick={() => storeId(ele.tmdbId)} to={`/film/id=${ele.tmdbId}`} >
                                    <Item.Header as='a' ><i>{ele.title}</i></Item.Header>
                                </Link>
                                <Item.Meta><i>Posted by: </i>{ele.reviewer}
                                    <Button animated='fade' floated='right' onClick={() => removeLike(ele.id)}>
                                        <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                                        <Button.Content hidden>Delete</Button.Content>
                                    </Button>
                                </Item.Meta>
                                <Item.Description >
                                    <p>{ele.Review.post}</p>
                                </Item.Description>
                                <Item.Extra>

                                </Item.Extra>
                            </Item.Content>
                        </Item>
                        <Divider section />
                    </>
                ))
            }
        </Item.Group>
    )
}
