import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReviews } from '../actions/movies'
import { Button, Comment, Feed, Form, Header, Icon, Rating } from 'semantic-ui-react';
import API from "../utils/API"
const moment = require('moment')

export default function CommentSection() {
    const stateMovie = useSelector(state => state.movies)
    const stateUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [comments, setComments] = useState(stateMovie.reviews);
    // Does each comment need to have its own state to toggle reply?

    const [text, setText] = useState("");
    const [status, setStatus] = useState(false);
    const [textError, setTextError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [likedReviews, setLikedReviews] = useState([])


    function handleInputChange(event) {
        setText(event.target.value);
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        console.log(stateUser)
        // check if user has already submitted a review for this movie
        // user for now can only submit 1 review per movie for the time being
        let movieId = stateMovie.currentFilmId
        let hasCommented = comments.find(({ User }) => User.name === stateUser.name)

        if (!stateUser.id) {
            console.log('no user logged in')
            setStatus(true)
            setTimeout(() => setStatus(false), 5000)
            return
        } else if (hasCommented) {
            console.log(hasCommented)
            setSubmitted(true)
            setTimeout(() => setSubmitted(false), 5000)
            return
        } else if (text.length < 1) {
            console.log("too short")
            setTextError(true)
            setTimeout(() => setTextError(false), 5000)
            return
        }
        // need to do validation to make sure the text field isn't empty
        // if empty display an error?

        let replyObj = {
            post: text,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            updatedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            MovieId: movieId,
            UserId: stateUser.id,
        }
        API.createMovieReview(replyObj).then(res => {
            API.getMovieReviews(movieId).then(res => {
                dispatch(setReviews(res.data))
                setComments(res.data)
            })
        })
        setText("");
    }

    function addToLikes(id) {
        if (!stateUser.id) {
            console.log('no user logged in')
            return;
        }

        let likeObj = {
            UserId: stateUser.id,
            ReviewId: id
        }

        API.addUserLike(likeObj).then(res => {
            getUserLikedReviews()
        })
    }

    function removeFromLikes(id) {
        let likeObj = {
            UserId: stateUser.id,
            ReviewId: id
        }
        // console.log(likeObj)
        API.removeUserLike(likeObj)
            .then(res => {
                getUserLikedReviews()
                console.log(res.data)
            })
    }

    function getUserLikedReviews() {
        API.getUserLikedReviews(stateUser.id).then(res => {
            // filter through all users liked reviews and find all that are associated with current movie
            const arr = res.data.filter(el => el.Review.MovieId === stateMovie.currentFilmId)
            const postIdArr = []
            for (let i = 0; i < arr.length; i++) {
                postIdArr.push(arr[i].ReviewId)
            }
            setLikedReviews(postIdArr)
        })
    }

    useEffect(() => {
        getUserLikedReviews()
    }, [comments])

    return (
        <>
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {/* When rendering, add a function to check if the comment has replies, if so add a Comment.Group after the end of Comment.Content*/}
                {comments.length === 0 ? <h3>Be the first to comment!</h3>
                    :
                    comments.map(el => (
                        <Comment key={el.id}>
                            {/* <Comment.Avatar src={el.userAvatar} /> */}
                            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                            <Comment.Content>
                                <Comment.Author as='a'>{el.User.nickname}</Comment.Author>
                                <Comment.Metadata>
                                    {/* <div>Score {el.likes}</div> */}
                                    <i>{el.createdAt}</i>
                                </Comment.Metadata>
                                <Comment.Text>{el.post}</Comment.Text>
                                <Comment.Actions>
                                    {/* thumbs down = filled in with color */}
                                    <Comment.Action>
                                        {likedReviews.includes(el.id)
                                            ? <Icon name="thumbs up" color='blue' onClick={() => removeFromLikes(el.id)} />
                                            : <Icon name="thumbs up outline" onClick={() => addToLikes(el.id)} />
                                        }
                                        Like
                                    </Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    ))
                }
            </Comment.Group>
            <Form reply>
                {/* <Rating icon='star' defaultRating={rating} maxRating={5} size='large' clearable onClick={handleStarClick} /> */}
                <Form.TextArea placeholder="Enter review here..." value={text} onChange={handleInputChange} />
                {status ? <h3>Please login to post a review.</h3>
                    : textError ? <h3>Please submit a review with more than 1 character.</h3>
                        : submitted ? <h3>You have already reviewed this movie.</h3>
                            : <></>
                }
                <Button content='Add Review' labelPosition='left' icon='edit' primary onClick={handleFormSubmit} />
            </Form>
        </>
    )
}