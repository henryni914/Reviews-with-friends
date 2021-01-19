import React, { useState } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'

export default function CommentSection() {

    // Call to db and retrieve reviews based on movieID 
    // Map through reviews and render a comment section
    // Does each comment need to have its own state to toggle reply?
    { }
    const [comments, setComments] = useState([
        {
            user: 1,
            userAvatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
            commentId: 1,
            comment: "Hello this is...",
            replies: [
                {
                    user: 100,
                    userAvatar: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
                    commentId: 3,
                    comment: "...this is nuts!"
                }
            ]
        },
        {
            user: 2,
            userAvatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
            commentId: 2,
            comment: "Testing comments..."
        }
    ]);

    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);
    const [textError, setTextError] = useState(false);
    const [ratingError, setRatingError] = useState(false);


    function handleInputChange(event) {
        setText(event.target.value);
        console.log('text', event.target.value)
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
            user: 4,
            userAvatar: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
            commentId: 5,
            comment: text
        }
        // if both pass, grab current user info, the text and rating
        // then save to db inside of current user's reviews (as well as movie table review?)
        console.log("button is working", text)
        setComments([...comments, replyObj])
        setText("")
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

                {comments.map(el => (
                    <Comment>
                        <Comment.Avatar src={el.userAvatar} />
                        <Comment.Content>
                            <Comment.Author as='a'>{el.user}</Comment.Author>
                            <Comment.Metadata>
                                <div>Just now</div>
                            </Comment.Metadata>
                            <Comment.Text>{el.comment}</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                                <Comment.Action>Save</Comment.Action>
                                <Comment.Action>Hide</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                ))}


            </Comment.Group>
            <Form reply>
                <Form.TextArea placeholder="Enter text here..." value={text} onChange={handleInputChange} />
                <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={handleFormSubmit} />
            </Form>
        </>
    )
}