import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilm } from '../actions/movies';
import { Button, Container, Divider, Form, Icon, Input, Item, Message } from 'semantic-ui-react';
import { setUserReviews } from '../actions/user';
import API from '../utils/API';


export default function UserReviews() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [reviews, setReviews] = useState([]);
    const [search, setSearch] = useState("");
    // post references the DB id of the review
    const [post, setPost] = useState("");
    const [text, setText] = useState("");
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

    // This function sets the ID to match with the review item, and renders a text field for that line, with the original post "text"
    function editPost(id, text) {
        setPost(id)
        setText(text)
    };

    // When user clicks cancel, the review is set back to "" so there is no more text field
    function cancelEdit(original) {
        setPost("")
        // setText(original)
    };

    // When user types in the text field while editing their review, this updates the state with the text in the text field
    function handleEdit(event) {
        setText(event.target.value);
    };

    // When user clicks save, the current text inside the text field is passed through as well as the ID that references the review's ID in the DB
    function saveEdit(id) {
        setPost("")
        let edit = {
            post: text
        }
        const reviewArr = reviews
        const updatedArr = reviewArr.map(el => {
            if (el.id === id) {
                el.post = text
            }
            return el;
        })

        API.editMovieReview(id, edit).then(res => {
            dispatch(setUserReviews(updatedArr))
        })
    };

    // Retrieve user reviews
    function getUserReviews(id) {
        API.getUserReviews(id).then(reviews => {
            setReviews(reviews.data)
            dispatch(setUserReviews(reviews.data))
        })
    };

    useEffect(() => {
        getUserReviews(user.id)
    }, [reviews]);

    const searchArr = reviews.filter(element => element.Movie.title.toLowerCase().includes(search.toLowerCase()))

    return (

        <>
            <Form>
                <Input icon='search' placeholder='Search by movie title...' value={search} onChange={handleInputChange} />
            </Form>
            <Item.Group>
                {searchArr.length > 0 &&
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
                                            <Button content='Save' labelPosition='left' icon='edit' primary onClick={() => saveEdit(ele.id)} />
                                            <Button content='Cancel' labelPosition='left' icon='edit' primary onClick={() => cancelEdit(ele.post)} />
                                        </Form>
                                    </Item.Content>
                                    :
                                    <>
                                        <Item.Content >
                                            <Link onClick={() => storeId(ele.Movie.tmdbID)} to={`/film/id=${ele.Movie.tmdbID}`} >
                                                <Item.Header as='a' ><i>{ele.Movie.title}</i></Item.Header>
                                            </Link>
                                            {ele.createdAt === ele.updatedAt && (
                                                <Item.Meta><i>Posted: </i>{ele.createdAt}</Item.Meta>
                                            )}
                                            {ele.createdAt !== ele.updatedAt && (
                                                <Item.Meta><i>Updated: </i>{ele.updatedAt}</Item.Meta>
                                            )}
                                            <Item.Description >
                                                <p>{ele.post}</p>
                                            </Item.Description>
                                            <Item.Extra>
                                                <Button animated='fade' floated='left' onClick={() => editPost(ele.id, ele.post)}>
                                                    <Button.Content visible><Icon name='edit outline' /></Button.Content>
                                                    <Button.Content hidden>Edit</Button.Content>
                                                </Button>
                                                <Button animated='fade' floated='left' onClick={() => deleteReview(ele.id)}>
                                                    <Button.Content visible><Icon name='trash alternate outline' /></Button.Content>
                                                    <Button.Content hidden>Delete</Button.Content>
                                                </Button>
                                            </Item.Extra>
                                        </Item.Content>
                                    </>
                                }
                            </Item>
                            <Divider section />
                        </>
                    ))
                }
                {reviews.length === 0 &&
                    <Container>
                        <Message negative>
                            <Message.Header>Nothing to display</Message.Header>
                            <p>You haven't reviewed any movies yet.</p>
                        </Message>
                    </Container>
                }
            </Item.Group >
        </>
    )
}