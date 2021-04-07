import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

export default function AccountSettings() {

    return (
        <Form>
            <Form.Field>
                <label>Display Name <i>(This will be visible to all users)</i></label>
                <input placeholder='Name' />
            </Form.Field>
            <Form.Field>
                <label>Email Address</label>
                <input placeholder='test@test.test' disabled/>
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    )
}