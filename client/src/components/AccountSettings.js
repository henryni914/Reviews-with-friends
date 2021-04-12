import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import API from '../utils/API';

export default function AccountSettings() {

    const stateUser = useSelector(state => state.user);
    const userName = stateUser.name
    const name = capitalizeFirstLetter(userName.substr(0, userName.indexOf('@')))

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

    return (
        <Form>
            <Form.Field>
                <label>Display Name <i>(This will be visible to all users)</i></label>
                {/* display user's name */}
                <input placeholder={name} />
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