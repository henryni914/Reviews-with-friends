import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilm } from '../actions/movies';
import { Button, Divider, Feed, Form, Header, Icon, Input, Item } from 'semantic-ui-react';
import { setUserReviews } from '../actions/user';
import API from '../utils/API';


export default function UserReviews() {

    const dispatch = useDispatch();
    const userReviews = useSelector(state => state.user.reviews)
    const [reviews, setReviews] = useState(userReviews)
    const [search, setSearch] = useState("");
    // let searchResults = reviews.filter(element => element.name.toLowerCase().includes(search.toLowerCase()))

    function handleInputChange(event) {
        setSearch(event.target.value);
    };

    function storeId(id) {
        dispatch(setFilm(id));
    };

    function deleteReview(id) {
        const updateArr = reviews.filter(element => element.id !== id)
        API.deleteMovieReview(id).then(res => {
            setReviews(updateArr)
            dispatch(setUserReviews(updateArr))
        })
    };

    const searchArr = reviews.filter(element => element.Movie.title.toLowerCase().includes(search.toLowerCase()))

    return (

        <>
            <Form>
                <Input icon='search' placeholder='Search by movie title...' value={search} onChange={handleInputChange} />
            </Form>
            <Item.Group>
                {searchArr.length == 0 ?
                    <h3>You haven't reviewed any movies yet.</h3>
                    :
                    searchArr.map(ele =>
                    (
                        <>
                            <Item key={ele.id}>
                                {/* <Link onClick={() => storeId(ele.Movie.tmdbID)} to={`/film/id=${ele.Movie.tmdbID}`} >
                            <img
                                className='search-img'
                                src={ele.Movie.image}
                                alt={ele.Movie.title}
                            ></img>
                        </Link> */}
                                <Item.Content>
                                    <Link onClick={() => storeId(ele.Movie.tmdbID)} to={`/film/id=${ele.Movie.tmdbID}`} >
                                        <Item.Header as='a' ><i>{ele.Movie.title}</i></Item.Header>
                                    </Link>
                                    <Item.Meta>{ele.createdAt}</Item.Meta>
                                    <Item.Description>
                                        <p>{ele.post}</p>
                                    </Item.Description>
                                </Item.Content>
                                <Button animated='fade' floated='right'>
                                    <Button.Content visible><Icon name='edit outline' /></Button.Content>
                                    <Button.Content hidden>Edit</Button.Content>
                                </Button>
                                <Button animated='fade' floated='right' onClick={() => deleteReview(ele.id)}>
                                    <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                                    <Button.Content hidden>Delete</Button.Content>
                                </Button>
                            </Item>
                            <Divider section />
                        </>
                    ))
                }
            </Item.Group>
        </>
        // <Item>
        // {reviews.map(ele => {
        //     let posterUrl = ("https://image.tmdb.org/t/p/original" + props.poster)
        //         (
        //                 <Link onClick={() => storeId(props.id)} to={`/film/id=${props.id}`} >
        //                     <img
        //                         class='search-img'
        //                         src={posterUrl}
        //                         alt={props.title}
        //                     ></img>
        //                 </Link>
        //             )
        //     })}
        // </Item>
        // <Feed>
        //     {/* {reviews.map(ele => ( */}
        //         <Feed.Event>
        //             <Feed.Label>
        //                 <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
        //             </Feed.Label>
        //             <Feed.Content>
        //                 <Feed.Summary>
        //                     <Feed.User>Elliot Fu</Feed.User> added you as a friend
        //                 <Feed.Date>
        //                         1 Hour Ago
        //                 </Feed.Date>
        //                 </Feed.Summary>
        //                 <Feed.Meta>
        //                     <Feed.Like>
        //                         <Icon name='like' />4 Likes
        //                      </Feed.Like>
        //                 </Feed.Meta>
        //             </Feed.Content>
        //         </Feed.Event>
        //     {/* ))} */}
        // </Feed>
    )
}