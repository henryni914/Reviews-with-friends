import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReviews } from '../actions/movies'
import { Button, Comment, Form, Header, Icon, Pagination } from 'semantic-ui-react';
import API from "../utils/API"
import { setUserLikedReviews } from '../actions/user';
const moment = require('moment')

export default function CommentSection(props) {
    // console.log(props)
    const stateMovie = useSelector(state => state.movies)
    const stateUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [status, setStatus] = useState(false);
    const [textError, setTextError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    // likedReviews holds an array of the reviews that the user has liked for current movie.
    const [likedReviews, setLikedReviews] = useState([]);
    // likedReviewIds holds the IDs of the reviews that the user has liked for current movie.
    // the ids are used to render the like button with an already liked state or not
    const [likedReviewIds, setLikedReviewIds] = useState([]);


    function handleInputChange(event) {
        setText(event.target.value);
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        // check if user has already submitted a review for this movie
        let movieId = stateMovie.currentFilmId
        let hasCommented = comments.find(({ User }) => User.name === stateUser.name)

        if (!stateUser.id) {
            // console.log('no user logged in')
            setStatus(true)
            setTimeout(() => setStatus(false), 5000)
            return
        } else if (hasCommented) {
            // console.log(hasCommented)
            setSubmitted(true)
            setTimeout(() => setSubmitted(false), 5000)
            return
        } else if (text.length < 1) {
            // console.log("too short")
            setTextError(true)
            setTimeout(() => setTextError(false), 5000)
            return
        }

        let replyObj = {
            post: text,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            updatedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            MovieId: movieId,
            UserId: stateUser.id,
        }
        API.createMovieReview(replyObj).then(res => {
            API.getMovieReviews(movieId).then(res => {
                // console.log(res.data)
                // dispatch(setReviews(res.data))
                setComments(res.data)
            })
        })
        setText("");
    }

    function addToLikes(id, nickname) {
        if (!stateUser.id) {
            return;
        }

        let likeObj = {
            tmdbId: props.tmdbId,
            reviewer: nickname,
            title: props.title,
            UserId: stateUser.id,
            ReviewId: id
        }
        console.log(likeObj)
        API.addUserLike(likeObj).then(res => {
            getUserLikedReviews()
        })
    }

    function removeFromLikes(id) {
        // id = review db id
        // find in likedReviews ReviewId === id then grab that likedReview id and pass to API to remove
        let post = likedReviews.find(({ ReviewId }) => ReviewId === id)
        // let updateArr = likedReviews.filter(el => el.id !== post.id)
        API.removeLike(post.id).then(res => {
            getUserLikedReviews()
        })
    }

    function getUserLikedReviews() {
        API.getUserLikedReviews(stateUser.id).then(res => {
            // filter through all users liked reviews and find all that are associated with current movie
            const arr = res.data.filter(el => el.Review.MovieId === stateMovie.currentFilmId)
            const postIdArr = [];
            const moviePosts = [];
            for (let i = 0; i < arr.length; i++) {
                postIdArr.push(arr[i].ReviewId) //arr[i].ReviewId
                moviePosts.push(arr[i])
            }
            setLikedReviews(moviePosts)
            setLikedReviewIds(postIdArr)
            dispatch(setUserLikedReviews(res.data))
        })
    }

    function getMovieReviews(id) {
        API.getMovieReviews(id).then(res => {
            setComments(res.data)
            dispatch(setReviews(res.data))
        })
    }

    useEffect(() => {
        getMovieReviews(stateMovie.currentFilmId)
        if (stateUser.email !== "") {
            getUserLikedReviews()
        }
    }, [])

    return (
        <>
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {/* When rendering, add a function to check if the comment has replies, if so add a Comment.Group after the end of Comment.Content*/}
                {comments.length === 0 ? <h3>Be the first to comment!</h3>
                    // comments.length > 0 &&
                    : comments.map(el => (
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
                                        {likedReviewIds.includes(el.id)
                                            ? <Icon name="thumbs up" color='blue' onClick={() => removeFromLikes(el.id)} />
                                            : <Icon name="thumbs up outline" onClick={() => addToLikes(el.id, el.User.nickname)} />
                                        }
                                    Like
                                </Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    ))
                }

                {/* {
                props.comments.length === 0 &&
                    <h3>Be the first to comment!</h3>
                } */}
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