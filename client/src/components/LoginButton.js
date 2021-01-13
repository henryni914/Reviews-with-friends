import React from 'react';
import { useAuth0 } from '../utils/auth0context';
import { Button } from 'semantic-ui-react'

const LoginButton = () => {
    const { loginWithRedirect} = useAuth0();

    return (
            <Button onClick={() => loginWithRedirect()}>
                Log In
            </Button>
    )
}

export default LoginButton;