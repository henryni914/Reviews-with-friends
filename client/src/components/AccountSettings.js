import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Form } from 'semantic-ui-react';
import { setNickname } from '../actions/user';
import API from '../utils/API';

export default function AccountSettings() {

    const stateUser = useSelector(state => state.user);
    const [search, setSearch] = useState("")
    const [nicknameError, setNicknameError] = useState(false)
    const [nicknameSuccess, setNicknameSuccess] = useState(false)
    const dispatch = useDispatch()

    function handleInputChange(event) {
        setSearch(event.target.value);
    };

    function updateUserInfo() {
        // API call to pull the nicknames of all users registered, to make sure it is unique
        API.findAllUsers().then(res => {
            // console.log(res.data)
            const unique = res.data.find(({ nickname }) => nickname.toLowerCase() === search.toLowerCase())
            // console.log('unique? ', unique)
            if (unique) {
                setNicknameError(true)
                return;
            } else {
                // console.log('success, the name is unique!')
                API.updateUserNickname(stateUser.id, { nickname: search }).then(res => {
                    // console.log(res.data)
                })
                dispatch(setNickname(search))
                setNicknameError(false)
                setNicknameSuccess(true)
            }
        })
    }

    return (
        <Form>
            <Form.Field>
                <label>Display Name <i>(This will be visible to all users)</i></label>
                {/* display user's nickname */}
                {/* <input placeholder={stateUser.nickname} /> */}
                <Input
                    placeholder={stateUser.nickname}
                    value={search}
                    onChange={handleInputChange}
                    action >
                </Input>
                {nicknameError ? <p><i>Sorry, that display name has already been taken. Please enter a new display name.</i></p>
                    : nicknameSuccess ? <p><i>Nickname successfully updated.</i></p>
                        : <></>
                }

            </Form.Field>
            <Form.Field>
                <label>Email Address</label>
                {/* display user's email */}
                <input placeholder={stateUser.email} disabled />
            </Form.Field>
            <Form.Field>
            </Form.Field>
            {/* On submit/click save entire form and the information */}
            <Button type='submit' onClick={updateUserInfo}>Save</Button>
        </Form>
    )
}