import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import API from '../utils/API';

export default function AccountSettings() {

    const stateUser = useSelector(state => state.user);

    function updateNickname(nick) {
        // insert API call here to update based on stateUser.id
    }

    return (
        <Form>
            <Form.Field>
                <label>Display Name <i>(This will be visible to all users)</i></label>
                {/* display user's name */}
                <input placeholder={stateUser.nickname} />
            </Form.Field>
            <Form.Field>
                <label>Email Address</label>
                {/* display user's email */}
                <input placeholder={stateUser.email} disabled />
            </Form.Field>
            <Form.Field>
                {/* <Checkbox label='I agree to the Terms and Conditions' /> */}
            </Form.Field>
            {/* On submit/click save entire form and the information */}
            <Button type='submit'>Save</Button>
        </Form>
    )
}