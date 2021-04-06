import React, { useState } from 'react';
import { Button, Comment, Feed, Form, Header, Icon, Rating } from 'semantic-ui-react';
import API from "../utils/API"

export default function CommentSection(props) {
    // console.log(`props userId ` + props.userId )
    console.log(`props props.filmId ` + props.filmDbId )
    // Call to db and retrieve reviews based on movieID 
    // Map through reviews and render a comment section
    // Does each comment need to have its own state to toggle reply?
    const [comments, setComments] = useState([
        {
            user: "Henry",
            userAvatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
            commentId: 1,
            comment: "Hello this is...",
            likes: 20,
            replies: [
                {
                    user: 100,
                    userAvatar: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
                    commentId: 3,
                    comment: "...this is nuts!",
                    likes: 20
                }
            ]
        },
        {
            user: "Henry",
            userAvatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
            commentId: 2,
            comment: "Testing comments...",
            likes: 20,
        }
    ]);

    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);
    const [textError, setTextError] = useState(false);


    function handleInputChange(event) {
        setText(event.target.value);
        // console.log('text', event.target.value)
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        // need to do validation to make sure the text field isn't empty
        if (text.length < 1) {
            console.log("too short")
            setTextError(true)
            return
        };
        // need to make sure user submits a 'rating'
        // if (rating < 1) {
        //     console.log("invalid rating")
        //     setRatingError(true)
        //     return
        // }
        let replyObj = {
            post: text,
            MovieId: props.filmDbId,
            UserId: props.userId,
        }
        console.log(replyObj)
        console.log(`text ` + typeof text)
        API.createMovieReview(replyObj).then(res => console.log(res))
        // if both pass, grab current user info, the text and rating
        // then save to db inside of current user's reviews (as well as movie table review?)
        // console.log("button is working", text);
        // setComments([...comments, replyObj]);
        // console.log("comments", comments)
        setText("");
    }

    return (
        <>
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>

                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'>Elliot Fu</Comment.Author>
                        <Comment.Metadata>
                            <div>Yesterday at 12:30AM</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>This has been very useful for my research. Thanks as well!</p>
                        </Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            <Comment.Action>Save</Comment.Action>
                            <Comment.Action>Hide</Comment.Action>
                        </Comment.Actions>
                        <Form reply hidden>
                            <Form.TextArea />
                            <Button
                                content='Add Reply'
                                labelPosition='left'
                                icon='edit'
                                primary
                            />
                        </Form>
                    </Comment.Content>
                </Comment>
                {/* When rendering, add a function to check if the comment has replies, if so add a Comment.Group after the end of Comment.Content*/}
                {comments.map(el => (
                    <Comment>
                        <Comment.Avatar src={el.userAvatar} />
                        <Comment.Content>
                            <Comment.Author as='a'>{el.user}</Comment.Author>
                            <Comment.Metadata>
                                <div>Score {el.likes}</div>
                            </Comment.Metadata>
                            <Comment.Text>{el.comment}</Comment.Text>
                            <Comment.Actions>
                                {/* thumbs down = filled in with color */}
                                <Comment.Action><Icon name="thumbs up outline" />Like</Comment.Action>
                                {/* <Comment.Action>{el.likes} </Comment.Action> */}
                                <Comment.Action><Icon name="thumbs down outline" />Downvote</Comment.Action>
                                {/* <Comment.Action>Save</Comment.Action> */}
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                ))}
            </Comment.Group>
            <Form reply>
                {/* <Rating icon='star' defaultRating={rating} maxRating={5} size='large' clearable onClick={handleStarClick} /> */}
                <Form.TextArea placeholder="Enter review here..." value={text} onChange={handleInputChange} />
                <Button content='Add Review' labelPosition='left' icon='edit' primary onClick={handleFormSubmit} />
            </Form>
        </>
    )
}