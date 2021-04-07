import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReviews } from '../actions/movies'
import { Button, Comment, Feed, Form, Header, Icon, Rating } from 'semantic-ui-react';
import API from "../utils/API"

export default function CommentSection(props) {
    // console.log(`props userId ` + props.userId )
    // console.log(`props props.filmId ` + props.filmDbId )
    const stateMovie = useSelector(state => state.movies)
    const stateUser = useSelector(state => state.user);
    // console.log(stateMovie.reviews)
    const dispatch = useDispatch();

    // Call to db and retrieve reviews based on movieID 
    // Map through reviews and render a comment section
    // Does each comment need to have its own state to toggle reply?
    const [comments, setComments] = useState(stateMovie.reviews);

    const [text, setText] = useState("");
    const [textError, setTextError] = useState(false);
    const [submitted, setSubmitted ] = useState(false)


    function handleInputChange(event) {
        setText(event.target.value);
        // console.log('text', event.target.value)
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        // check if user has already submitted a review for this movie
        // user for now can only submit 1 review per movie
        let hasCommented = comments.find(({User}) => User.name === stateUser.name )
        if ( hasCommented ) {
            console.log(hasCommented)
            setSubmitted(true)
            setTimeout(() => setSubmitted(false), 5000)
            return
        };
        // need to do validation to make sure the text field isn't empty
        if (text.length < 1) {
            console.log("too short")
            setTextError(true)
            setTimeout(() => setTextError(false), 5000)
            return
        };
        let replyObj = {
            post: text,
            MovieId: props.filmDbId,
            UserId: stateUser.id,
        }
        // console.log(replyObj)
        API.createMovieReview(replyObj).then(res => {
            // console.log(res.data)
            API.getMovieReviews(props.filmDbId).then(res => {
                // console.log(res.data)
                dispatch(setReviews(res.data))
                setComments(res.data)
            })
        })
        setText("");
    }

    useEffect(() => {
        // console.log(comments)
    }, [comments])

    return (
        <>
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {/* When rendering, add a function to check if the comment has replies, if so add a Comment.Group after the end of Comment.Content*/}
                {comments.length < 1 ? <h3>Be the first to comment!</h3>
                    :
                    comments.map(el => (
                        <Comment key={el.id}>
                            {/* <Comment.Avatar src={el.userAvatar} /> */}
                            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                            <Comment.Content>
                                <Comment.Author as='a'>{el.User.name}</Comment.Author>
                                <Comment.Metadata>
                                    {/* <div>Score {el.likes}</div> */}
                                </Comment.Metadata>
                                <Comment.Text>{el.post}</Comment.Text>
                                <Comment.Actions>
                                    {/* thumbs down = filled in with color */}
                                    <Comment.Action><Icon name="thumbs up outline" />Like</Comment.Action>
                                    {/* <Comment.Action>{el.likes} </Comment.Action> */}
                                    {/* <Comment.Action><Icon name="thumbs down outline" />Downvote</Comment.Action> */}
                                    {/* <Comment.Action>Save</Comment.Action> */}
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    ))
                }
            </Comment.Group>
            <Form reply>
                {/* <Rating icon='star' defaultRating={rating} maxRating={5} size='large' clearable onClick={handleStarClick} /> */}
                <Form.TextArea placeholder="Enter review here..." value={text} onChange={handleInputChange} />
                { textError ? <h3>Please submit a review with more than 1 character.</h3> 
                : submitted ? <h3>You have already reviewed this movie.</h3> 
                : <></>
                }
                <Button content='Add Review' labelPosition='left' icon='edit' primary onClick={handleFormSubmit} />
            </Form>
        </>
    )
}