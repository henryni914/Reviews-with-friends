import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilm } from '../actions/movies'
import { Button, Divider, Feed, Icon, Item } from 'semantic-ui-react'


export default function UserReviews() {

    const dispatch = useDispatch();
    const userReviews = useSelector(state => state.user.reviews)
    const [reviews, setReviews] = useState(userReviews)
    console.log(reviews)
    // console.log(userReviews)

    function storeId(id) {
        dispatch(setFilm(id));
    }

    return (
        <Item.Group>
            {reviews.map(ele =>
            (
                <>
                    <Item>
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
                        <Button animated='fade' floated='right'>
                            <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                            <Button.Content hidden>Delete</Button.Content>
                        </Button>
                    </Item>
                    <Divider section />
                </>
            )
            )}
        </Item.Group>
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