import React, { useRef } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

export default function AccountSettings() {

    return (
        <Form>
            <Form.Field>
                <label>Display Name <i>(This will be visible to all users)</i></label>
                {/* display user's name */}
                <input placeholder='Name' />
            </Form.Field>
            <Form.Field>
                <label>Email Address</label>
                {/* display user's email */}
                <input placeholder='test@test.test' disabled />
            </Form.Field>
            <Form.Field>
                {/* <Checkbox label='I agree to the Terms and Conditions' /> */}
            </Form.Field>
            {/* On submit/click save entire form and the information */}
            <Button type='submit'>Save</Button>
        </Form>
    )
}