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
    // post = post db id
    const [post, setPost] = useState("")
    const [text, setText] = useState("")
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

    function editPost(id, text) {
        setPost(id)
        setText(text)
        console.log(id, text)
    }

    function cancelEdit(original) {
        setPost("")
        // setText(original)
    }

    function handleEdit(event) {
        setText(event.target.value);
    }

    const searchArr = reviews.filter(element => element.Movie.title.toLowerCase().includes(search.toLowerCase()))

    console.log(text)
    // searchArr.id = review db ID reference this when updating

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
                                {post === ele.id
                                    ?
                                    <Item.Content>
                                        <Link onClick={() => storeId(ele.Movie.tmdbID)} to={`/film/id=${ele.Movie.tmdbID}`} >
                                            <Item.Header as='a' ><i>{ele.Movie.title}</i></Item.Header>
                                        </Link>
                                        <Item.Meta>{ele.createdAt}</Item.Meta>
                                        <Form reply>
                                            <Form.TextArea value={text} onChange={handleEdit} />
                                            <Button content='Save' labelPosition='left' icon='edit' primary />
                                            <Button content='Cancel' labelPosition='left' icon='edit' primary onClick={() => cancelEdit(ele.post)} />
                                        </Form>
                                    </Item.Content>
                                    :
                                    <>
                                        <Item.Content>
                                            <Link onClick={() => storeId(ele.Movie.tmdbID)} to={`/film/id=${ele.Movie.tmdbID}`} >
                                                <Item.Header as='a' ><i>{ele.Movie.title}</i></Item.Header>
                                            </Link>
                                            <Item.Meta>{ele.createdAt}</Item.Meta>
                                            <Item.Description>
                                                <p>{ele.post}</p>
                                            </Item.Description>
                                        </Item.Content>
                                        <Button animated='fade' floated='right' onClick={() => editPost(ele.id, ele.post)}>
                                            <Button.Content visible><Icon name='edit outline' /></Button.Content>
                                            <Button.Content hidden>Edit</Button.Content>
                                        </Button>
                                        <Button animated='fade' floated='right' onClick={() => deleteReview(ele.id)}>
                                            <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                                            <Button.Content hidden>Delete</Button.Content>
                                        </Button>
                                    </>
                                }
                            </Item>
                            <Divider section />
                        </>
                    ))
                }
            </Item.Group >
        </>
    )
}